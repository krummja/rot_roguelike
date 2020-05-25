import * as ROT from 'rot-js';

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
  isWalkable ?: boolean,
  isDiggable ?: boolean,
  x ?: number,
  y ?: number,
  name ?: string,
  mixins ?: any[],
  multiplier ?: number
}

// https://mariusschulz.com/blog/mixin-classes-in-typescript
type Constructor<T = {}> = new (...args: any[]) => T;


export { Constructor, Screen, IProperties };
