import type { ToolCall } from "ollama"

export type Message = {
  role: "system" | "user" | "assistant" | "tool"
  content: string
  tool_calls?: ToolCall[]
}

export type ToolInput = {
  name: string
  type: string
  required: boolean
}

export type Tool = {
  name: string
  description: string
  input: ToolInput[]
}
