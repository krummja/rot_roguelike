import * as ROT from 'rot-js';
import { Builder } from '../builder';
import { Game } from '../game';
import { Map, IScreen, Tile, Entity, Player } from './';

class PlayScreen implements IScreen
{
  private readonly _player: Player;
  public game: Game;

  public map: Map;
  public mapArray: Array<Array<Tile>> = null;
  public mapWidth: number = 200;
  public mapHeight: number = 200;


  constructor(game: Game)
  {
    this.game = game;
    this._player = new Player({
      character: '@',
      name: 'Player',
      foreground: '#e44fa3',
      background: '' || 'black'
    }, this.game, this.map)
  }


  public enter()
  {
    let width = 128;
    let height = 80;
    let depth = 6;
    let tiles = new Builder(width, height, depth).tiles;
    this.map = new Map(tiles, this._player);
    this.map.engine.start();
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
    let topLeftX = Math.max(0, this._player.x - (screenWidth / 2));
    topLeftX = Math.min(topLeftX, this.map.width - screenWidth);
    let topLeftY = Math.max(0, this._player.y - (screenHeight / 2));
    topLeftY = Math.min(topLeftY, this.map.height - screenHeight);


    // Put bounds on the viewport movement relative to the map edge
    for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
      for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
        let tile = this.map.getTile(x, y, this._player.z);
        display.draw(
            x - topLeftX,
            y - topLeftY,
            tile.char,
            tile.fg,
            tile.bg,
        );
      }
    }
    // Render the player
    display.draw(
        this._player.x - topLeftX,
        this._player.y - topLeftY,
        this._player.char,
        this._player.fg,
        this._player.getBgTint(this._player.x, this._player.y, this._player.z, this.map)
    );
  }

  public handleInput(inputType: string, inputData: any): void
  {
    if (inputType === 'keydown') {
      if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
        console.log('Enter key pressed!');
      }
      if (inputData.keyCode === ROT.KEYS.VK_LEFT) {
        this.move(-1, 0, 0);
      } else if (inputData.keyCode === ROT.KEYS.VK_RIGHT) {
        this.move(1, 0, 0);
      } else if (inputData.keyCode === ROT.KEYS.VK_UP) {
        this.move(0, -1, 0);
      } else if (inputData.keyCode === ROT.KEYS.VK_DOWN) {
        this.move(0, 1, 0);
      }
      this.map.engine.unlock();
      this.game.refresh();
    } else if (inputType === 'keypress') {
      let keyChar = String.fromCharCode(inputData.charCode);
      if (keyChar === '>') {
        this.move(0, 0, 1);
      } else if (keyChar === '<') {
        this.move(0, 0, -1);
      } else {
        return;
      }
      this.map.engine.unlock();
      this.game.refresh();
    }
  }

  public move(dX: number, dY: number, dZ: number): void
  {
    let newX = this._player.x + dX;
    let newY = this._player.y + dY;
    let newZ = this._player.z + dZ;
    this._player.tryMove(newX, newY, newZ, this.map);
    console.log(this._player);
  }
}


export { PlayScreen };