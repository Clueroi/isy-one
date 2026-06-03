import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { ScriptRepository } from 'src/domain/scripts/application/repositories/script.repository'
import { Script } from 'src/domain/scripts/enterprise/entities/script'
import { PrismaScriptMapper } from '../mapper/prisma-script-mapper'

@Injectable()
export class PrismaScriptRepository implements ScriptRepository {

  constructor(private prisma: PrismaService) { }

  async findMany(): Promise<Script[]> {
    const scripts = await this.prisma.script.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    })

    return scripts.map(PrismaScriptMapper.toDomain)
  }

  async save(script: Script): Promise<void> {
    const data = PrismaScriptMapper.toPrisma(script)

    await this.prisma.script.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async findById(id: string): Promise<Script | null> {
    const script = await this.prisma.script.findUnique({
      where: {
        id,
      },
    })

    if (!script) {
      return null
    }

    return PrismaScriptMapper.toDomain(script)
  }

  async create(script: Script): Promise<void> {
    const data = PrismaScriptMapper.toPrisma(script)

    await this.prisma.script.create({
      data,
    })
  }
}