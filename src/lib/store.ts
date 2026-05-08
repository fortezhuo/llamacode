import type { Message } from "../type.js"

class Store {
  private messages: Message[] = []
  private systemPrompt: string = ""

  setSystemPrompt(prompt: string) {
    this.systemPrompt = prompt
  }

  addMessage(message: Message) {
    this.messages.push(message)
  }
  clearMessages() {
    this.messages = []
  }
  getMessages() {
    return [
      { role: "system", content: this.systemPrompt },
      ...this.messages,
    ] satisfies Message[]
  }
}

const store = new Store()
store.setSystemPrompt(`Concise coding assistant. cwd: ${process.cwd()}`)
export { store }
