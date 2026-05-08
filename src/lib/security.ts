import path from "path"

export function safePath(inputPath: string): string {
  const resolved = path.resolve(inputPath)
  const cwd = process.cwd()
  const isInsideCwd = resolved.startsWith(cwd + path.sep)
  const isCwdItself = resolved === cwd

  if (!isInsideCwd && !isCwdItself) {
    throw new Error(`Access denied: path outside working directory`)
  }

  return resolved
}
