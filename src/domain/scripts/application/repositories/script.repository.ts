import { Script } from "../../enterprise/entities/script";

export abstract class ScriptRepository {
  abstract create(script: Script): Promise<void>;
  abstract save(script: Script): Promise<void>;
  abstract findById(id: string): Promise<Script | null>;
  abstract findMany(): Promise<Script[]>
}
