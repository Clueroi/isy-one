import { Injectable } from '@nestjs/common'
import { Either, left, right } from 'src/core/either'
import { ScriptRepository } from '../repositories/script.repository'

interface EditScriptUseCaseRequest {
  scriptId: string

  name: string
  description: string
  path: string
  active: boolean
}

type EditScriptUseCaseResponse = Either<
  string,
  {}
>

@Injectable()
export class EditScriptUseCase {
  constructor(
    private scriptRepository: ScriptRepository,
  ) {}

  async execute({
    scriptId,
    name,
    description,
    path,
    active,
  }: EditScriptUseCaseRequest): Promise<EditScriptUseCaseResponse> {

    const script = await this.scriptRepository.findById(scriptId)

    if (!script) {
      return left('Script not found')
    }

    script.name = name
    script.description = description
    script.path = path
    script.active = active

    await this.scriptRepository.save(script)

    return right({})
  }
}