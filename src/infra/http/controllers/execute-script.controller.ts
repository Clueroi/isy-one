import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { ExecuteScriptUseCase } from 'src/domain/execution/application/use-cases/execute-script-use-case'

const executeScriptBodySchema = z.object({
  scriptId: z.string()
})

type ExecuteScriptBodySchema = z.infer<
  typeof executeScriptBodySchema
>

@Controller('/executions')
export class ExecuteScriptController {
  constructor(
    private executeScriptUseCase: ExecuteScriptUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(
      new ZodValidationPipe(
        executeScriptBodySchema,
      ),
    )
    body: ExecuteScriptBodySchema,
  ) {
    const result =
      await this.executeScriptUseCase.execute({
        scriptId: body.scriptId,
      })

    if (result.isLeft()) {
      throw new BadRequestException(
        result.value,
      )
    }

    return {
      execution: result.value.execution,
    }
  }
}