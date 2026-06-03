import { Controller, Patch, HttpCode, Param, Body, BadRequestException } from "@nestjs/common"
import { EditScriptUseCase } from "src/domain/scripts/application/use-cases/update-use-case"

@Controller('/scripts/:id')
export class EditScriptController {

  constructor(
    private editScriptUseCase: EditScriptUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('id') id: string,
    @Body() body: any,
  ) {

    const result = await this.editScriptUseCase.execute({
      scriptId: id,
      name: body.name,
      description: body.description,
      path: body.path,
      active: body.active,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}