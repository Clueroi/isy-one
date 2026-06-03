export interface ShellExecutionResult {
  stdout: string
  stderr: string
  success: boolean
}

export abstract class ShellExecutor {
  abstract execute(
    path: string,
  ): Promise<ShellExecutionResult>
}