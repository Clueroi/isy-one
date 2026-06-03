import { Controller, Get, Param, BadRequestException } from "@nestjs/common"
import { GetScriptUseCase } from "src/domain/scripts/application/use-cases/get-by-id-use-case"

@Controller('/scripts/:id')
export class GetScriptController {

  constructor(
    private getScriptUseCase: GetScriptUseCase,
  ) {}

  @Get()
  async handle(
    @Param('id') id: string,
  ) {

    const result = await this.getScriptUseCase.execute({
      scriptId: id,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      script: result.value.script,
    }
  }
}