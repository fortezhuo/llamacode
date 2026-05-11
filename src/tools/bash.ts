import { execSync } from "child_process"

export async function bash(args: Record<string, unknown>): Promise<string> {
  const cmd = args.cmd as string

  try {
    const stdout = execSync(cmd, {
      cwd: process.cwd(),
      timeout: 30_000,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
    })
    return stdout.trim() || "(empty)"
  } catch (error: unknown) {
    const err = error as { stdout?: string; stderr?: string; message: string }
    const output = [err.stdout, err.stderr].filter(Boolean).join("\n")
    return output.trim() || err.message
  }
}
