import { Game } from '../Game';
import { LeftPanel } from './LeftPanel';

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