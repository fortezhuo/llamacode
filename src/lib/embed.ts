import { getOllamaClient } from "./ollama.js"
import { EMBED_MODEL } from "./constant.js"
export async function embed(text: string): Promise<Float32Array> {
  const client = getOllamaClient()
  const response = await client.embed({
    model: EMBED_MODEL,
    input: text,
  })
  const embedding = response.embeddings[0] ?? []
  return new Float32Array(embedding)
}
