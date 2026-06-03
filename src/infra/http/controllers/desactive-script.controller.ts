import { Controller, Delete, HttpCode, Param, BadRequestException } from "@nestjs/common"
import { DeleteScriptUseCase } from "src/domain/scripts/application/use-cases/delete-use-case"

@Controller('/scripts/:id')
export class DeleteScriptController {

  constructor(
    private deleteScriptUseCase: DeleteScriptUseCase,
  ) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') id: string,
  ) {

    const result = await this.deleteScriptUseCase.execute({
      scriptId: id,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}