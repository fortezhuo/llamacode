import fg from "fast-glob"
import fs from "fs/promises"

export async function glob(args: Record<string, unknown>): Promise<string> {
  const pattern = args.pat as string
  const basePath = (args.path as string | undefined) ?? "."
  const fullPattern = `${basePath}/${pattern}`.replace("//", "/")

  const files = await fg(fullPattern, { cwd: process.cwd(), dot: true })

  const stats = await Promise.all(
    files.map(async (f) => ({ path: f, mtime: (await fs.stat(f)).mtimeMs })),
  )

  return (
    stats
      .sort((a, b) => b.mtime - a.mtime)
      .map((f) => f.path)
      .join("\n") || "none"
  )
}
