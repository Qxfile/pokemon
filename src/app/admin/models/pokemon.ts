import {Tag} from "./tag";

export class Pokemon {
  readonly id: number
  name: string
  description: string
  height: string
  weight: string
  hp: number
  attack: number
  defend: number
  level: number
  stamina: number
  spd: number
  abilities: string[]
  tags: Tag[]
}
