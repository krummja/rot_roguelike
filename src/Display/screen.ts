import * as ROT from 'rot-js';
import { Game } from '../game';

interface IScreenOptions
{

}

interface IScreen
{
  enter(): void;
  exit(): void;
  render(display: ROT.Display): void;
  handleInput(inputType: string, inputData: any): void;
}


abstract class Screen implements IScreen
{
  // public game: Game;
  public options: IScreenOptions | null;


  protected constructor(game: Game, options?: IScreenOptions)
  {
    if (options) { this.options = options; }
  }


  public enter(): void
  {

  }

  public exit(): void
  {

  }

  public render(display: ROT.Display): void
  {

  }

  public handleInput(inputType: string, inputData: any): void
  {

  }
}


export { Screen };