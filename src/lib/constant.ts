export const MODEL = "gpt-oss:120b-cloud"
export const EMBED_MODEL = "nomic-embed-text"
export const TITLE = `
 🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙 
 🦙                                                                                🦙 
 🦙  ██╗     ██╗      █████╗ ███╗   ███╗ █████╗   ██████╗ ██████╗ ██████╗ ███████╗ 🦙
 🦙  ██║     ██║     ██╔══██╗████╗ ████║██╔══██╗ ██╔════╝██╔═══██╗██╔══██╗██╔════╝ 🦙
 🦙  ██║     ██║     ███████║██╔████╔██║███████║ ██║     ██║   ██║██║  ██║█████╗   🦙
 🦙  ██║     ██║     ██╔══██║██║╚██╔╝██║██╔══██║ ██║     ██║   ██║██║  ██║██╔══╝   🦙
 🦙  ███████╗███████╗██║  ██║██║ ╚═╝ ██║██║  ██║ ╚██████╗╚██████╔╝██████╔╝███████╗ 🦙
 🦙  ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝  ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝ 🦙
 🦙                                                                                🦙 
 🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙🦙

 An AI-powered code generation tool powered by Ollama | ${MODEL}  
`

export const RESET = "\x1b[0m"
export const BOLD = "\x1b[1m"
export const DIM = "\x1b[2m"
export const BLUE = "\x1b[34m"
export const CYAN = "\x1b[36m"
export const GREEN = "\x1b[32m"
export const RED = "\x1b[31m"
export const MAGENTA = "\x1b[35m"

export const TOOLS = [
  {
    name: "read_file",
    description: "Read the contents of a file",
    input: [{ name: "path", type: "string", required: true }],
  },
  {
    name: "delete_file",
    description: "Delete a file",
    input: [{ name: "path", type: "string", required: true }],
  },
  {
    name: "write_file",
    description: "Write content to a file",
    input: [
      { name: "path", type: "string", required: true },
      { name: "content", type: "string", required: true },
    ],
  },
  {
    name: "glob",
    description: "Find files matching a glob pattern",
    input: [
      { name: "pat", type: "string", required: true },
      { name: "path", type: "string", required: false },
    ],
  },
  {
    name: "grep",
    description: "Search for a pattern in files",
    input: [
      { name: "pat", type: "string", required: true },
      { name: "path", type: "string", required: false },
    ],
  },
  {
    name: "bash",
    description: "Execute a bash command and return the output",
    input: [{ name: "cmd", type: "string", required: true }],
  },
  {
    name: "read_pdf",
    description: "Read the contents of a PDF file",
    input: [{ name: "path", type: "string", required: true }],
  },
  {
    name: "search_pdf",
    description: "Search for a term in indexed PDF files",
    input: [{ name: "query", type: "string", required: true }],
  },
]
