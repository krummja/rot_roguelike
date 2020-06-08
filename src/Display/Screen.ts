import * as ROT from 'rot-js';
import { Game } from '../Game';
import { Map } from '../Display';

interface IScreen
{
  game?: Game;
  map?: Map;
  key: string;
  enter(): void;
  exit(): void;
  render(display: ROT.Display): void;
  handleInput(inputType: string, inputData: any): void;
}

export { IScreen };