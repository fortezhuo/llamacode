import fs from "fs/promises"
import { safePath } from "../lib/security.js"

export async function delete_file(args: Record<string, unknown>) {
  const path = safePath(args.path as string)
  await fs.rm(path)
  return `File deleted: ${path}`
}
