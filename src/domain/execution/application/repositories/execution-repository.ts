import { Execution } from "../../enterprise/entity/execute";

export abstract class ExecutionRepository {

    abstract create(execution: Execution): Promise<void>

    abstract save(execution: Execution): Promise<void>

    abstract findById(id: string): Promise<Execution | null>
}