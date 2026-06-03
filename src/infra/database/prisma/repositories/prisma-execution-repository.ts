import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { PrismaExecutionMapper } from '../mapper/prisma-execution-mapper'
import { ExecutionRepository } from 'src/domain/execution/application/repositories/execution-repository'
import { Execution } from 'src/domain/execution/enterprise/entity/execute'

@Injectable()
export class PrismaExecutionRepository
    implements ExecutionRepository {

    constructor(
        private prisma: PrismaService,
    ) { }

    async create(
        execution: Execution,
    ): Promise<void> {

        const data =
            PrismaExecutionMapper.toPrisma(
                execution,
            )

        await this.prisma.execution.create({
            data,
        })
    }

    async save(
        execution: Execution,
    ): Promise<void> {

        const data =
            PrismaExecutionMapper.toPrisma(
                execution,
            )

        await this.prisma.execution.update({
            where: {
                id: data.id,
            },
            data,
        })
    }

    async findById(
        id: string,
    ): Promise<Execution | null> {

        const execution =
            await this.prisma.execution.findUnique({
                where: {
                    id,
                },
            })

        if (!execution) {
            return null
        }

        return PrismaExecutionMapper.toDomain(
            execution,
        )
    }
}