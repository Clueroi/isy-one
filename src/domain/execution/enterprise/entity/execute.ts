import { Entity } from "src/core/entity/entity"
import { UniqueEntityId } from "src/core/entity/unique-entity-is"

export enum ExecutionStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface ExecutionProps {
  scriptId: string

  status: ExecutionStatus

  parameters?: any

  stdout?: string
  stderr?: string

  startedAt: Date
  finishedAt?: Date
}

export class Execution extends Entity<ExecutionProps> {

  get scriptId() {
    return this.props.scriptId
  }

  get status() {
    return this.props.status
  }

  get stdout() {
    return this.props.stdout
  }

  get stderr() {
    return this.props.stderr
  }

  get startedAt() {
    return this.props.startedAt
  }

  get finishedAt() {
    return this.props.finishedAt
  }

  set status(value: ExecutionStatus) {
    this.props.status = value
  }

  set stdout(value: string | undefined) {
    this.props.stdout = value
  }

  set stderr(value: string | undefined) {
    this.props.stderr = value
  }

  set finishedAt(value: Date | undefined) {
    this.props.finishedAt = value
  }

  static create(
    props: ExecutionProps,
    id?: UniqueEntityId,
  ) {
    return new Execution(props, id)
  }
}