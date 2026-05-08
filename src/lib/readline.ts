import readline from "readline"

let rl: readline.Interface
const prompt = " ❯ "

export function getReadlineInterface() {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }
  return rl
}

export async function ask(): Promise<string> {
  const rl = getReadlineInterface()
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim())
    })
  })
}
