import * as ROT from 'rot-js';
import { Game } from '../game';
import { Map, IScreen, Tile } from './';


class PlayScreen implements IScreen
{
  private _map: Map;
  private map: Array<Array<Tile>> = null;

  public game: Game;


  constructor(game: Game)
  {
    this.game = game;
  }


  public enter()
  {
    console.log("PlayScreen.enter:  Entered play screen.");

    this.map = [];
    for (let x = 0; x < 80; x++)
    {
      this.map.push([]);
      for (let y = 0; y < 40; y++)
      {
        this.map[x].push(Tile.nullTile());
      }
    }

    this._map = Map.generate(this.map);
    console.log(this._map);
  }

  public exit(): void
  {
    console.log("PlayScreen.exit:   Exited play screen.");
  }

  public render(display: ROT.Display): void
  {
    // TODO: Refactor this to the following:
    // for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
    // for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
    for (let x = 0; x < this._map.width; x++)
    {
      for (let y = 0; y < this._map.height; y++)
      {
        let glyph = this._map.getTile(x, y).glyph;
        display.draw(x, y, glyph.char, glyph.fg, glyph.bg);
      }
    }
  }

  /**
   *
   * @param {string} inputType
   * @param inputData
   */
  public handleInput(inputType: string, inputData: any): void
  {
    if (inputType === 'keydown')
    {
      if (inputData.key === ROT.KEYS.VK_RETURN)
      {
        console.log('Enter key pressed!');
      }
    }
  }
}


export { PlayScreen };