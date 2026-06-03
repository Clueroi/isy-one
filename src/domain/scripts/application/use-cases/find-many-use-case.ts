import { Injectable } from '@nestjs/common'
import { ScriptRepository } from '../repositories/script.repository'
import { Script } from '../../enterprise/entities/script'

interface FetchScriptsUseCaseResponse {
  scripts: Script[]
}

@Injectable()
export class FetchScriptsUseCase {
  constructor(
    private scriptRepository: ScriptRepository,
  ) {}

  async execute(): Promise<FetchScriptsUseCaseResponse> {
    const scripts = await this.scriptRepository.findMany()

    return {
      scripts,
    }
  }
}