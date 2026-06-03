import { Injectable } from '@nestjs/common'
import { spawn } from 'child_process'
import { ShellExecutionResult, ShellExecutor } from 'src/domain/shell/application/use-cases/shell-executor'


@Injectable()
export class SpawnShellExecutor
    implements ShellExecutor {
    async execute(
        path: string,
    ): Promise<ShellExecutionResult> {
        return new Promise(
            (resolve, reject) => {
                const process = spawn(path)

                let stdout = ''
                let stderr = ''

                process.stdout.on(
                    'data',
                    (chunk) => {
                        stdout += chunk.toString()
                    },
                )

                process.stderr.on(
                    'data',
                    (chunk) => {
                        stderr += chunk.toString()
                    },
                )

                process.on(
                    'close',
                    (code) => {
                        resolve({
                            stdout,
                            stderr,
                            success: code === 0,
                        })
                    },
                )

                process.on(
                    'error',
                    (error) => {
                        reject(error)
                    },
                )
            },
        )
    }
}