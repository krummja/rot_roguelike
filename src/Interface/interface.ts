import { LeftPanel } from './leftPanel';
import { Game } from '../game';

class Interface
{
  public leftPanel: LeftPanel;
  private _game: Game;

  constructor(game: Game)
  {
    this._game = game;
    this.leftPanel = new LeftPanel(this._game);
  }
}


export { Interface }