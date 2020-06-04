import * as ROT from 'rot-js';


interface IScreen
{
  done?: boolean;
  enter(): void;
  exit(): void;
  render(display: ROT.Display): void;
  handleInput(inputType: string, inputData: any): void;
}

export { IScreen };