import fs from "fs/promises"
import { extractText } from "unpdf"
import { embed } from "../lib/embed.js"
import { chunk } from "../lib/chunk.js"
import { saveChunks } from "../lib/db.js"

export async function read_pdf(args: Record<string, unknown>): Promise<any> {
  try {
    const filePath = args.path as string
    const fileBuffer = await fs.readFile(filePath)
    const uint8Array = new Uint8Array(
      fileBuffer.buffer,
      fileBuffer.byteOffset,
      fileBuffer.byteLength,
    )

    const result = await extractText(uint8Array)
    const chunks = await chunk(result.text.join(" "))

    for (const [_, element] of chunks.entries()) {
      const embedding = await embed(element)
      saveChunks(`${filePath}`, element, embedding)
    }

    return `Indexed ${chunks.length} chunks from ${filePath}. You can now use search_pdf to answer questions about this document.`
  } catch (error) {
    console.error(`Error reading PDF: ${(error as Error).message}`)
    return ""
  }
}
