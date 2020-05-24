import * as ROT from 'rot-js';

type Screen = {
  enter(): void;
  exit(): void;
  render(display: ROT.Display): void;
  handleInput(inputType: string, inputData: any): void;
}

export { Screen };