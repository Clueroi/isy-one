import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { ScriptRepository } from 'src/domain/scripts/application/repositories/script.repository'
import { Script } from 'src/domain/scripts/enterprise/entities/script'
import { PrismaScriptMapper } from '../mapper/prisma-script-mapper'

@Injectable()
export class PrismaScriptRepository implements ScriptRepository {

  constructor(private prisma: PrismaService) { }

  save(script: Script): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async create(script: Script): Promise<void> {
    const data = PrismaScriptMapper.toPrisma(script)

    await this.prisma.script.create({
      data,
    })
  }
}