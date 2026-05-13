import type { SubAgentOption } from "../type.js"
import { COMMAND_HANDLER } from "./command.js"
import { SUBAGENT_SYSTEM_PROMPT, SYSTEM_PROMPT } from "./constant.js"
import { invoke } from "./invoke.js"
import { print } from "./print.js"
import { ask } from "./readline.js"
import { Store } from "./store.js"

const store = new Store()
store.setSystemPrompt(SYSTEM_PROMPT)

export async function startAgent() {
  print().separator()

  const input = await ask()

  if (input.startsWith("/")) {
    const handler = COMMAND_HANDLER.get(input)
    if (handler) {
      await handler(store)
    } else {
      print().red(`Unknown command: ${input}`)
    }
  } else {
    await invoke(input, store)
  }

  return startAgent()
}

export async function startSubAgent(option: SubAgentOption) {
  print().separator()
  const store = new Store()
  store.setSystemPrompt(SUBAGENT_SYSTEM_PROMPT)
  await invoke(option.task, store, option)
  return store
}
