import { Script as PrismaScriptType} from '../../../../generated/prisma/client'
import { Script } from 'src/domain/scripts/enterprise/entities/script';
import { UniqueEntityId } from 'src/core/entity/unique-entity-is';

export class PrismaScriptMapper {
  static toDomain(raw: PrismaScriptType): Script {
    return Script.create({
      name: raw.name,
      description: raw.description,
      path: raw.path,
      active: raw.active
    },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(script: Script): PrismaScriptType {
    return {
      id: script.id.toString(),
      name: script.name,
      description: script.description,
      path: script.path,
      active: script.active
    } as any
  }
}
