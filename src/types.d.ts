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


export { Screen, IProperties };
