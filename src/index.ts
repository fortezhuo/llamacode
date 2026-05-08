import { startAgent } from "./lib/agent.js"
import { print } from "./lib/print.js"
import { TITLE } from "./lib/constant.js"

async function main() {
  print().bold(TITLE)
  print().dim(`Type '/help' to see available commands.`)
  await startAgent()
}

main()
