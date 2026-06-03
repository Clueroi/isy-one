import { Either, left, right } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { ScriptRepository } from "../repositories/script.repository"
import { Script } from "../../enterprise/entities/script"


interface RegisterScriptUseCaseRequest {
  name: string
  description: string
  path: string
  active?: boolean
}

type RegisterScriptUseCaseResponse = Either<
  '',
  {
    script: Script
  }
>

@Injectable()
export class CreateScriptUseCase {

  constructor(
    private scriptRepository: ScriptRepository,
  ) { }


  async execute({
    name,
    description,
    path,
    active
  }: RegisterScriptUseCaseRequest): Promise<RegisterScriptUseCaseResponse> {

    const script = await Script.create({
      name,
      description,
      path,
      active: true
    })

    await this.scriptRepository.create(script)

    return right({
      script
    })

  }
}