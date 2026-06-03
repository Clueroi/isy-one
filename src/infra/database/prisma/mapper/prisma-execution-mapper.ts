import {
  Execution as PrismaExecution,
} from 'src/generated/prisma/client'


import { UniqueEntityId } from 'src/core/entity/unique-entity-is'
import { Execution, ExecutionStatus } from 'src/domain/execution/enterprise/entity/execute'

export class PrismaExecutionMapper {

  static toDomain(
    raw: PrismaExecution,
  ): Execution {

    return Execution.create(
      {
        scriptId: raw.scriptId,

        status:
          raw.status as ExecutionStatus,

        parameters: raw.parameters,

        stdout: raw.stdout ?? undefined,
        stderr: raw.stderr ?? undefined,

        startedAt: raw.startedAt,
        finishedAt:
          raw.finishedAt ?? undefined,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    execution: Execution,
  ) {

    return {
      id: execution.id.toString(),

      scriptId: execution.scriptId,

      status: execution.status,

      stdout: execution.stdout,
      stderr: execution.stderr,

      startedAt: execution.startedAt,
      finishedAt: execution.finishedAt,
    }
  }
}