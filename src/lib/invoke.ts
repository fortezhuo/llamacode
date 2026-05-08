import { print } from "./print.js"
import { store } from "./store.js"
import { chat } from "./ollama.js"
import type { ToolCall } from "ollama"
import * as listTools from "../tools/index.js"

export async function invoke(input: string) {
  store.addMessage({ role: "user", content: input })

  while (true) {
    const messages = store.getMessages()
    print("assistant").dim(`Thinking... (${messages.length} messages)`)
    const response = await chat(messages)
    const { content, tool_calls } = response.message

    if (tool_calls && tool_calls.length > 0) {
      store.addMessage({ role: "assistant", content, tool_calls })

      for (const tool_call of tool_calls) {
        const { name, arguments: args } = (tool_call as ToolCall).function
        print("assistant").magenta(`Invoking tool: ${name}`)
        try {
          if (name in listTools) {
            const toolFunc = (listTools as Record<string, Function>)[name]
            if (typeof toolFunc == "function") {
              const result = await toolFunc(args)
              store.addMessage({ role: "tool", content: result })
            } else {
              throw new Error(`Tool is not a function: ${name}`)
            }
          } else {
            throw new Error(`Tool not found: ${name}`)
          }
        } catch (error) {
          print("assistant").red(`Error occurred while invoking tool: ${name}`)
          store.addMessage({
            role: "tool",
            content: `Error: ${(error as Error).message}`,
          })
        }
      }
    } else {
      print("assistant").bold(content)
      break
    }
  }
}
