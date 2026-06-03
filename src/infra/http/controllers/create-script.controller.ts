import { Body, Controller, HttpCode, Post, UseGuards, BadRequestException } from '@nestjs/common'
import { z } from 'zod'
import { JwtAuthGuard } from 'src/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CreateScriptUseCase } from 'src/domain/scripts/application/use-cases/create-script'

const createScriptSchema = z.object({
  name: z.string().min(1),
  path: z.string().min(1),
  description: z.string().min(1),
  active: z.boolean(),

})

type CreateScriptSchema = z.infer<typeof createScriptSchema>

@Controller('scripts')
export class CreateScriptController {
  constructor(private createScriptUseCase: CreateScriptUseCase) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createScriptSchema)) body: CreateScriptSchema,
  ) {
    const result = await this.createScriptUseCase.execute({
      name: body.name,
      description: body.description,
      path: body.path,
      active: body.active,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value)
    }

    return {
      script: result,
    }
  }
}
