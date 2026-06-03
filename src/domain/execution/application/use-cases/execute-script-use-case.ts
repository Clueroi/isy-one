import { Injectable } from '@nestjs/common'
import { Either, left, right } from 'src/core/either'
import { Execution, ExecutionStatus } from '../../enterprise/entity/execute'
import { ScriptRepository } from 'src/domain/scripts/application/repositories/script.repository'
import { ExecutionRepository } from '../repositories/execution-repository'
import { ShellExecutor } from 'src/domain/shell/application/use-cases/shell-executor'


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
    private shellExecutor: ShellExecutor,
  ) { }

  async execute({
    scriptId,
  }: ExecuteScriptUseCaseRequest): Promise<ExecuteScriptUseCaseResponse> {
    const script = await this.scriptRepository.findById(scriptId)

    if (!script) {
      return left('Script not found')
    }

    if (
      !script.path.endsWith('.sh')
    ) {
      throw new Error(
        'Arquivo inválido',
      )
    }


    const execution = Execution.create({
      scriptId,

      status: ExecutionStatus.RUNNING,

      startedAt: new Date(),
    })

    await this.executionRepository.create(execution)

    const result =
      await this.shellExecutor.execute(
        script.path,
      )


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