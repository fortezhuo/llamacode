import { RESET } from "./constant.js"
import { print } from "./print.js"
import { getReadlineInterface } from "./readline.js"
import { store } from "./store.js"

type CommandHandler = () => void | Promise<void>

const rl = getReadlineInterface()

export const COMMAND = new Map<string, string>([
  ["/help", "Show this help message"],
  ["/messages", "Show the conversation history"],
  ["/reset", "Reset the conversation"],
  ["/quit", "Exit the CLI"],
])

export const COMMAND_HANDLER = new Map<string, CommandHandler>([
  [
    "/help",
    () => {
      print().bold("Available Commands")
      for (const [command, description] of COMMAND) {
        print().blue(`${command}${RESET}: ${description}`)
      }
    },
  ],
  [
    "/messages",
    () => {
      const messages = store.getMessages()
      print().blue(`Current conversation (${messages.length} messages):`)
      messages.forEach((msg) => {
        const { content, tool_calls } = msg
        if (tool_calls) {
          for (const tool_call of tool_calls) {
            const { name } = tool_call.function
            print().magenta(`- tool : ${name} called`)
          }
        } else {
          print().reset(`- ${content}`)
        }
      })
    },
  ],
  [
    "/reset",
    () => {
      store.clearMessages()
      print().green("Conversation cleared!")
    },
  ],
  [
    "/quit",
    () => {
      print().red("Exiting 🦙 LlamaCode. Goodbye!")
      rl.close()
      process.exit(0)
    },
  ],
])
