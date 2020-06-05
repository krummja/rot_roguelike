import * as ROT from 'rot-js';
import { Player } from '../ECS';


interface IScreen
{
  enter(): void;
  exit(): void;
  render(display: ROT.Display): void;
  handleInput(inputType: string, inputData: any): void;
}

export { IScreen };