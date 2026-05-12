export function chunck(text: string, size = 500, overlap = 50): string[] {
  const result: string[] = []
  const arr = text.split(/\s+/)
  for (let i = 0; i < arr.length; i += size - overlap) {
    result.push(arr.slice(i, i + size).join(" "))
  }
  return result
}
