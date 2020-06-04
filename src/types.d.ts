import * as ROT from 'rot-js';
import { FOV } from 'rot-js';
import { Game } from './game';

type Screen = {
  enter(): void;
  exit(): void;
  render(display: ROT.Display): void;
  handleInput(inputType: string, inputData: any): void;
}

interface IProperties {
  character ?: string,
  foreground ?: string,
  background ?: string,
  walkable ?: boolean,
  diggable ?: boolean,
  traversable ?: boolean,
  opaque ?: boolean,
  sightRadius ?: number,
  x ?: number,
  y ?: number,
  z ?: number,
  name ?: string,
  mixins ?: any[],
  multiplier ?: number,
}

// https://mariusschulz.com/blog/mixin-classes-in-typescript
type Constructor<T = {}> = new (...args: any[]) => T;

type FOV = typeof FOV.PreciseShadowcasting;

export { Constructor, Screen, IProperties, FOV };
