import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { ScriptRepository } from "src/domain/scripts/application/repositories/script.repository";
import { PrismaScriptRepository } from "./prisma/repositories/prisma-script-repository";
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
  ],
  exports: [
    PrismaService,
    ScriptRepository,
  ]
})
export class DatabaseModule {

}