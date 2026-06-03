import { Controller, Get } from "@nestjs/common"
import { FetchScriptsUseCase } from "src/domain/scripts/application/use-cases/find-many-use-case"

@Controller('/scripts')
export class FetchScriptsController {

  constructor(
    private fetchScriptsUseCase: FetchScriptsUseCase,
  ) {}

  @Get()
  async handle() {

    const result = await this.fetchScriptsUseCase.execute()

    return {
      scripts: result.scripts,
    }
  }
}