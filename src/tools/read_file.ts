import fs from "fs/promises"
import { safePath } from "../lib/security.js"

export async function read_file(args: Record<string, unknown>) {
  const path = safePath(args.path as string)
  const result = await fs.readFile(path, "utf-8")
  return result
}
