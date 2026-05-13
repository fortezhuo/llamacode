import { startSubAgent } from "../lib/agent.js"

export async function sub_agent(
  args: Record<string, unknown>,
): Promise<string> {
  const task = args.task as string
  const context = args.context as string | undefined
  const toolsRaw = args.tools as string | undefined
  const maxSteps = (args.max_steps as number | undefined) ?? 20

  const tools = toolsRaw
    ? toolsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : undefined

  try {
    const store = await startSubAgent({ task, tools, context, maxSteps })
    const messages = store.getMessages()

    return [`=== Subagent Result ===`, `Task: ${task}`, messages].join("\n")
  } catch (error) {
    return `Subagent failed: ${(error as Error).message}`
  }
}
