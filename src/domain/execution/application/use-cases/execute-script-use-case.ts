import { Injectable } from '@nestjs/common'
import { spawn } from 'child_process'

import { Either, left, right } from 'src/core/either'
import { Execution, ExecutionStatus } from '../../enterprise/entity/execute'
import { ScriptRepository } from 'src/domain/scripts/application/repositories/script.repository'
import { ExecutionRepository } from '../repositories/execution-repository'


interface ExecuteScriptUseCaseRequest {
  scriptId: string
}

type ExecuteScriptUseCaseResponse = Either<
  string,
  {
    execution: Execution
  }
>

@Injectable()
export class ExecuteScriptUseCase {
  constructor(
    private scriptRepository: ScriptRepository,
    private executionRepository: ExecutionRepository,
  ) {}

  async execute({
    scriptId,
  }: ExecuteScriptUseCaseRequest): Promise<ExecuteScriptUseCaseResponse> {
    const script = await this.scriptRepository.findById(scriptId)

    if (!script) {
      return left('Script not found')
    }

    const execution = Execution.create({
      scriptId,

      status: ExecutionStatus.RUNNING,

      startedAt: new Date(),
    })

    await this.executionRepository.create(execution)

    const result = await new Promise<{
      stdout: string
      stderr: string
      success: boolean
    }>((resolve, reject) => {
      const child = spawn(script.path)

      let stdout = ''
      let stderr = ''

      child.stdout.on('data', (data) => {
        stdout += data.toString()
      })

      child.stderr.on('data', (data) => {
        stderr += data.toString()
      })

      child.on('error', (error) => {
        reject(error)
      })

      child.on('close', (code) => {
        resolve({
          stdout,
          stderr,
          success: code === 0,
        })
      })
    })

    execution.stdout = result.stdout
    execution.stderr = result.stderr

    execution.finishedAt = new Date()

    execution.status = result.success
      ? ExecutionStatus.SUCCESS
      : ExecutionStatus.FAILED

    await this.executionRepository.save(execution)

    return right({
      execution,
    })
  }
}