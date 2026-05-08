import {
  RESET,
  BOLD,
  DIM,
  BLUE,
  CYAN,
  GREEN,
  RED,
  MAGENTA,
} from "./constant.js"

export const print = (role?: "assistant" | "user") => {
  const prefix = role === "assistant" ? "🦙 " : role === "user" ? "❯ " : ""
  return {
    separator: () => console.log(),
    reset: (text: string) => console.log(`${RESET} ${prefix}${text}${RESET}`),
    bold: (text: string) => console.log(`${BOLD} ${prefix}${text}${RESET}`),
    dim: (text: string) => console.log(`${DIM} ${prefix}${text}${RESET}`),
    blue: (text: string) => console.log(`${BLUE} ${prefix}${text}${RESET}`),
    cyan: (text: string) => console.log(`${CYAN} ${prefix}${text}${RESET}`),
    green: (text: string) => console.log(`${GREEN} ${prefix}${text}${RESET}`),
    red: (text: string) => console.log(`${RED} ${prefix}${text}${RESET}`),
    magenta: (text: string) =>
      console.log(`${MAGENTA} ${prefix}${text}${RESET}`),
  }
}
