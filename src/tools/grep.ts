import fg from "fast-glob"
import fs from "fs/promises"

export async function grep(args: Record<string, unknown>): Promise<string> {
  const pattern = new RegExp(args.pat as string)
  const basePath = (args.path as string | undefined) ?? "."
  const hits: string[] = []

  const files = await fg(`${basePath}/**/*`, { cwd: process.cwd(), dot: true })

  for (const filepath of files) {
    const stat = await fs.stat(filepath)
    if (stat.size >= 1_000_000) continue

    const text = await fs.readFile(filepath, "utf-8")
    for (const [i, line] of text.split("\n").entries()) {
      if (pattern.test(line)) {
        hits.push(`${filepath}:${i + 1}:${line}`)
        if (hits.length >= 50) return hits.join("\n")
      }
    }
  }

  return hits.join("\n") || "none"
}
