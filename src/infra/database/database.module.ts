import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { ScriptRepository } from "src/domain/scripts/application/repositories/script.repository";
import { PrismaScriptRepository } from "./prisma/repositories/prisma-script-repository";
import { ExecutionRepository } from "src/domain/execution/application/repositories/execution-repository";
import { PrismaExecutionRepository } from "./prisma/repositories/prisma-execution-repository";
// TO DO - CACHE

@Module({
  imports: [
    // TO DO - CACHE
  ],
  providers: [
    PrismaService,
    {
      provide: ScriptRepository,
      useClass: PrismaScriptRepository
    },
    {
      provide: ExecutionRepository,
      useClass: PrismaExecutionRepository
    }
  ],
  exports: [
    PrismaService,
    ScriptRepository,
    ExecutionRepository
  ]
})
export class DatabaseModule {

}