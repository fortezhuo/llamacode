import fs from "fs/promises"
import { safePath } from "../lib/security.js"

export async function write_file(args: Record<string, unknown>) {
  const path = safePath(args.path as string)
  const content = args.content as string
  await fs.writeFile(path, content, "utf-8")
  return "ok"
}
