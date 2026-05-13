import { print } from "./print.js"
import { Store } from "./store.js"
import { chat } from "./ollama.js"
import * as listTools from "../tools/index.js"
import { TOOLS } from "./constant.js"
import type { ToolCall } from "ollama"
import type { SubAgentOption } from "../type.js"

type Methods = keyof ReturnType<typeof print>

export async function invoke(
  input: string,
  store: Store,
  opt?: SubAgentOption,
) {
  let step = 0
  const maxStep = !opt ? Infinity : opt?.maxSteps!
  const label = !opt ? "" : "Sub Agent "
  const color = (!opt ? "dim" : "magenta") satisfies Methods
  const allowedTools = !opt
    ? undefined
    : TOOLS.filter((t) => (opt?.tools || []).includes(t.name))

  const content = !!opt?.context
    ? `Context:\n${opt.context}\n\nTask: ${input}`
    : input

  store.addMessage({ role: "user", content })

  while (step < maxStep) {
    step++
    const messages = store.getMessages()
    print("assistant")[color](
      `${label}Thinking... [${messages.length} tokens in context]`,
    )
    try {
      const response = await chat(messages, allowedTools)
      const { content, tool_calls } = response.message

      if (tool_calls && tool_calls.length > 0) {
        store.addMessage({ role: "assistant", content, tool_calls })

        for (const tool_call of tool_calls) {
          const { name, arguments: args } = (tool_call as ToolCall).function
          print("assistant").cyan(`Invoking tool: ${name}`)
          print("assistant").cyan(`[${name}] ${formatArgs(args)}`)
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
            print("assistant").red(
              `Error occurred while invoking tool: ${name}`,
            )
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
    } catch (error: unknown) {
      const err = error as { status_code?: number; message: string }

      if (err.status_code === 500) {
        print("assistant").red(`Ollama Internal Error — Please try again`)
      } else {
        print("assistant").red(`Error: ${err.message}`)
      }

      break
    }
  }
}

function formatArgs(args: Record<string, unknown>): string {
  if (typeof args.cmd === "string") return args.cmd
  if (typeof args.command === "string") return args.command

  if (typeof args.path === "string") {
    const extra =
      typeof args.content === "string"
        ? ` (${args.content.split("\n").length} lines)`
        : ""
    return args.path + extra
  }

  if (typeof args.pat === "string") {
    return args.path ? `${args.pat} in ${args.path}` : args.pat
  }

  return JSON.stringify(args)
}
