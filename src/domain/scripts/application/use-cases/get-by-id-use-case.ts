import { Injectable } from '@nestjs/common'
import { ScriptRepository } from '../repositories/script.repository'
import { Either, left, right } from 'src/core/either'
import { Script } from '../../enterprise/entities/script'

interface GetScriptUseCaseRequest {
  scriptId: string
}

type GetScriptUseCaseResponse = Either<
  string,
  {
    script: Script
  }
>

@Injectable()
export class GetScriptUseCase {
  constructor(
    private scriptRepository: ScriptRepository,
  ) {}

  async execute({
    scriptId,
  }: GetScriptUseCaseRequest): Promise<GetScriptUseCaseResponse> {

    const script = await this.scriptRepository.findById(scriptId)

    if (!script) {
      return left('Script not found')
    }

    return right({
      script,
    })
  }
}