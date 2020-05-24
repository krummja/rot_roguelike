import * as ROT from 'rot-js';
import { Game } from '../game';

interface IScreen
{
  enter(): void;
  exit(): void;
  render(display: ROT.Display): void;
  handleInput(inputType: string, inputData: any): void;
}

export { IScreen };