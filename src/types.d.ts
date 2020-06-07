import * as ROT from 'rot-js';
import { FOV } from 'rot-js';

import { Player, Entity } from './ECS';
import { Game } from './Game';

declare type Screen = {
  game: Game;
  key: string;
  player?: Player;
  enter(): void;
  exit(): void;
  render(display: ROT.Display): void;
  handleInput(inputType: string, inputData: any): void;
}

declare type Position = {
  x: number, y: number, z: number
}

// declare type GameEntity = Entity | Mob;


interface IProperties {
  character ?: string,
  foreground ?: [number, number, number],
  background ?: [number, number, number],
  darkBackground ?: [number, number, number],
  walkable ?: boolean,
  diggable ?: boolean,
  traversable ?: {
    open ?: boolean,
    direction ?: string | undefined
  },
  opaque ?: boolean,
  sightRadius ?: number,
  position?: Position,
  x ?: number,
  y ?: number,
  z ?: number,
  name ?: string,
  multiplier ?: number,
}

// https://mariusschulz.com/blog/mixin-classes-in-typescript
type Constructor<T = {}> = new (...args: any[]) => T;

type FOV = typeof FOV.PreciseShadowcasting;

export { Constructor, Screen, IProperties, Position, FOV };
