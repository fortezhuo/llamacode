import { COMMAND_HANDLER } from "./command.js"
import { invoke } from "./invoke.js"
import { print } from "./print.js"
import { ask } from "./readline.js"

export async function startAgent() {
  print().separator()

  const input = await ask()

  if (input.startsWith("/")) {
    const handler = COMMAND_HANDLER.get(input)
    if (handler) {
      await handler()
    } else {
      print().red(`Unknown command: ${input}`)
    }
  } else {
    await invoke(input)
  }

  return startAgent()
}
