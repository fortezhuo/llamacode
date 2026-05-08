import { Ollama } from "ollama"
import { MODEL, TOOLS } from "./constant.js"
import type { Message, Tool } from "../type.js"

let client: Ollama | null = null

export function getOllamaClient() {
  if (!client) {
    client = new Ollama({
      host: process.env.OLLAMA_HOST || "http://localhost:11434",
    })
  }
  return client
}

export async function chat(messages: Message[], tools = TOOLS) {
  const client = getOllamaClient()
  const schemaTools = toSchema(tools)

  const response = await client.chat({
    model: MODEL,
    tools: schemaTools,
    messages,
    stream: false,
  })
  return response
}

function toSchema(tools: Tool[]) {
  const schema = tools.map((tool) => ({
    type: "function",
    function: {
      name: tool.name,
      description: tool.description,
      parameters: {
        type: "object",
        required: tool.input
          .filter((param) => param.required)
          .map((param) => param.name),
        properties: tool.input.reduce(
          (
            acc: Record<string, { type: string }>,
            param: { name: string; type: string; required: boolean },
          ) => {
            acc[param.name] = {
              type: param.type,
            }
            return acc
          },
          {} as Record<string, { type: string }>,
        ),
      },
    },
  }))

  return schema
}
