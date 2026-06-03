import { Injectable } from '@nestjs/common'
import { Either, left, right } from 'src/core/either'
import { ScriptRepository } from '../repositories/script.repository'

interface DeleteScriptUseCaseRequest {
  scriptId: string
}

type DeleteScriptUseCaseResponse = Either<
  string,
  {}
>

@Injectable()
export class DeleteScriptUseCase {
  constructor(
    private scriptRepository: ScriptRepository,
  ) {}

  async execute({
    scriptId,
  }: DeleteScriptUseCaseRequest): Promise<DeleteScriptUseCaseResponse> {

    const script = await this.scriptRepository.findById(scriptId)

    if (!script) {
      return left('Script not found')
    }

    script.active = false

    await this.scriptRepository.save(script)

    return right({})
  }
}