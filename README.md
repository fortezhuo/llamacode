# 🦙 LlamaCode

An AI-powered coding assistant that runs locally via [Ollama](https://ollama.com), built with TypeScript.

---

## Requirements

- [Node.js](https://nodejs.org) v18+
- [pnpm](https://pnpm.io)
- [Ollama](https://ollama.com)

---

## Install Ollama

### macOS

```bash
brew install ollama
```

Or download the app directly from [ollama.com/download](https://ollama.com/download).

### Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Windows

Download the installer from [ollama.com/download](https://ollama.com/download).

---

## Pull a Model

LlamaCode requires a model that supports **tool/function calling**. Recommended options:

```bash
ollama pull gpt-oss:120b-cloud
```

> To see all models you have installed, run `ollama list`.

Once pulled, make sure Ollama is running:

```bash
ollama serve
```

By default, Ollama runs on `http://localhost:11434`. You can override this with the `OLLAMA_HOST` environment variable.

---

## Setup

Clone the repo and install dependencies:

```bash
git clone https://github.com/fortezhuo/llamacode.git
cd llamacode
pnpm install
```

Set the model in `src/lib/constant.ts` to match what you pulled:

```ts
export const MODEL = "gpt-oss:120b-cloud"
```

---

## Usage

```bash
pnpm start
```

LlamaCode will start an interactive CLI session in your current working directory.

```
 🦙 LlamaCode

 ❯ buka package.json
 🦙 Invoking tool: read_file
 🦙 Here's your package.json: ...

 ❯ tambahkan script build ke package.json
 🦙 Invoking tool: write_file
 🦙 Done! Added "build": "tsc" to scripts.
```

---

## Commands

| Command     | Description                        |
| ----------- | ---------------------------------- |
| `/help`     | Show available commands            |
| `/messages` | Show current conversation history  |
| `/reset`    | Clear conversation and start fresh |
| `/quit`     | Exit LlamaCode                     |

---

## Available Tools

LlamaCode gives the AI access to the following file operations within your **current working directory**:

| Tool          | Description                 |
| ------------- | --------------------------- |
| `read_file`   | Read the contents of a file |
| `write_file`  | Write or overwrite a file   |
| `delete_file` | Delete a file               |

> **Security:** All file operations are sandboxed to the directory where LlamaCode was launched. The AI cannot access files outside of it.

---

## Configuration

| Environment Variable | Default                  | Description       |
| -------------------- | ------------------------ | ----------------- |
| `OLLAMA_HOST`        | `http://localhost:11434` | Ollama server URL |

Example:

```bash
OLLAMA_HOST=http://192.168.1.10:11434 pnpm start
```

---

## Project Structure

```
src/
  lib/
    agent.ts       # Main CLI loop, input routing
    command.ts     # Built-in command handlers (/help, /reset, etc.)
    constant.ts    # Model, ANSI colors, tool definitions
    invoke.ts      # AI invocation and tool execution loop
    ollama.ts      # Ollama client and schema conversion
    print.ts       # Colored terminal output
    readline.ts    # User input interface
    security.ts    # Path sandboxing (safePath)
    store.ts       # Conversation history and system prompt
  tools/
    read_file.ts
    write_file.ts
    delete_file.ts
    index.ts
  index.ts         # Entry point
  type.ts          # Shared TypeScript types
```

---

## License

ISC
