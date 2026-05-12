import { searchSimilar } from "../lib/db.js"
import { embed } from "../lib/embed.js"

export async function search_pdf(
  args: Record<string, unknown>,
): Promise<string> {
  try {
    const query = args.query as string
    const embedding = await embed(query.trim())
    const results = await searchSimilar(embedding)
    if (results.length === 0)
      return "No relevant content found in indexed documents."

    const context = results
      .map((r: any, i) => `[${i + 1}] source: ${r.source}\n${r.content}`)
      .join("\n\n")

    return `Based on the following excerpts, answer the user's question: "${query}"\n\n${context}`
  } catch (error) {
    return "An error occurred while searching the documents."
  }
}
