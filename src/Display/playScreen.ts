import * as ROT from 'rot-js';
import { Game } from '../game';
import { Map, IScreen, Tile } from './';


class PlayScreen implements IScreen
{
  private _map: Map;
  private _centerX: number = 0;
  private _centerY: number = 0;

  public game: Game;
  public map: Array<Array<Tile>> = null;
  public mapWidth: number = 200;
  public mapHeight: number = 200;


  constructor(game: Game)
  {
    this.game = game;
  }


  public enter()
  {
    console.log('PlayScreen.enter:  Entered play screen.');

    this.map = [];
    for (let x = 0; x < this.mapWidth; x++) {
      this.map.push([]);
      for (let y = 0; y < this.mapHeight; y++) {
        this.map[x].push(Tile.nullTile());
      }
    }

    this._map = Map.generate(this.map, this.mapWidth, this.mapHeight);
    console.log(this._map);
  }

  public exit(): void
  {
    console.log('PlayScreen.exit:   Exited play screen.');
  }

  public render(display: ROT.Display): void
  {
    let screenWidth = this.game.screenWidth;
    let screenHeight = this.game.screenHeight;

    // Figure out the viewport dimensions
    let topLeftX = Math.max(0, this._centerX - (screenWidth / 2));
    topLeftX = Math.min(topLeftX, this._map.width - screenWidth);
    let topLeftY = Math.max(0, this._centerY - (screenHeight / 2));
    topLeftY = Math.min(topLeftY, this._map.height - screenHeight);

    // Put bounds on the viewport movement relative to the map edge
    for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
      for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
        // FIXME: 'glyph' property has been removed during extension of Glyph -> Tile class
        let glyph = this._map.getTile(x, y);
        display.draw(x - topLeftX, y - topLeftY, glyph.char, glyph.fg, glyph.bg);
      }
    }

    // Render the player
    display.draw(this._centerX - topLeftX, this._centerY - topLeftY, '@', 'white', 'black');
  }

  public handleInput(inputType: string, inputData: any): void
  {
    if (inputType === 'keydown') {
      if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
        console.log('Enter key pressed!');
      }
      if (inputData.keyCode === ROT.KEYS.VK_LEFT) {
        this.move(-1, 0);
      } else if (inputData.keyCode === ROT.KEYS.VK_RIGHT) {
        this.move(1, 0);
      } else if (inputData.keyCode === ROT.KEYS.VK_UP) {
        this.move(0, -1);
      } else if (inputData.keyCode === ROT.KEYS.VK_DOWN) {
        this.move(0, 1);
      }
    }
  }

  // TODO: Refactor into a separate class, later into a component.
  public move(dX: number, dY: number)
  {
    this._centerX = Math.max(0, Math.min(this._map.width - 1, this._centerX + dX));
    this._centerY = Math.max(0, Math.min(this._map.height - 1, this._centerY + dY));
  }
}


export { PlayScreen };