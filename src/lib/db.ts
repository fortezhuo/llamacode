import Database from "better-sqlite3"
import * as sqliteVec from "sqlite-vec"
import path from "path"
import fs from "fs"

const DB_PATH = path.join(process.cwd(), "rag.db")
let db: Database.Database | null = null

export function getDatabase(): Database.Database {
  if (db) return db
  const isNew = !fs.existsSync(DB_PATH)
  db = new Database(DB_PATH)
  sqliteVec.load(db)

  if (isNew) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source TEXT NOT NULL,
        content TEXT NOT NULL
      );
    `)

    db.exec(`
      CREATE VIRTUAL TABLE vec_documents USING vec0(
        rowid INTEGER PRIMARY KEY,
        embedding FLOAT[768] 
      );
    `)
  }
  return db
}

export function isIndexed(source: string): boolean {
  const db = getDatabase()
  const sql = db.prepare("SELECT 1 FROM documents WHERE source = ?")
  const result = sql.get(source)
  return !!result
}

export function saveChunks(
  source: string,
  content: string,
  embedding: Float32Array,
) {
  try {
    const db = getDatabase()
    const insert = db.prepare(
      "INSERT INTO documents (source, content) VALUES (?, ?)",
    )
    const insertVec = db.prepare(
      "INSERT INTO vec_documents (rowid, embedding) VALUES (?, ?)",
    )

    const result = insert.run(source, content)
    const rowid = BigInt(result.lastInsertRowid)
    insertVec.run(rowid, embedding)
  } catch (error) {
    console.error(`Error saving chunks: ${(error as Error).message}`)
  }
}

export function searchSimilar(embedding: Float32Array, limit = 5) {
  const db = getDatabase()
  return db
    .prepare(
      `
    SELECT d.source, d.content, v.distance
    FROM vec_documents v
    LEFT JOIN documents d ON d.id = v.rowid
    WHERE v.embedding MATCH ?
    AND k = ?
    ORDER BY v.distance
  `,
    )
    .all(embedding, limit)
}
