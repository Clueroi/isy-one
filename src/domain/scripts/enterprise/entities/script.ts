import { Entity } from "src/core/entity/entity"
import { UniqueEntityId } from "src/core/entity/unique-entity-is"

export interface ScriptProps {
  name: string
  description: string
  path: string
  active: boolean
}

export class Script extends Entity<ScriptProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get path() {
    return this.props.path
  }

  get active() {
    return this.props.active ?? false
  }


  set name(value: string) {
    this.props.name = value
  }

  set description(value: string) {
    this.props.description = value
  }

  set path(value: string) {
    this.props.path = value
  }

  set active(value: boolean) {
    this.props.active = value
  }


  static create(props: ScriptProps, id?: UniqueEntityId) {
    const script = new Script(props, id)

    return script
  }
}