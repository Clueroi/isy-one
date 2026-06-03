import { Script } from "../../enterprise/entities/script";

export abstract class ScriptRepository {
  abstract create(script: Script): Promise<void>;
  abstract save(script: Script): Promise<void>;
}
