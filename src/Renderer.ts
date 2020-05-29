import * as ROT from 'rot-js';
import { Game } from './Game';


class Renderer
{
  private _game: Game;

  public get game(): Game { return this._game; }
  public set game(value: Game) { this._game = value; }


  constructor(game: Game)
  {
    this._game = game;
  }


  public clear(): void
  {

  }

  public refresh(): void
  {

  }

  public render(display: ROT.Display): void
  {

  }
}


export { Renderer };