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
  public mapHeight: number = 100;


  constructor(game: Game)
  {
    this.game = game;
    this._player = new Player({
      character: '@',
      name: 'Player',
      foreground: '#e44fa3',
      background: '' || 'black'
    }, this.game, this.map);
  }


  public enter()
  {
    let width = this.mapWidth;
    let height = this.mapHeight;
    let depth = 3;
    let ratio = 0.70;
    let iterations = 100;
    let tilesFilled = 50;

    console.log("SCENE >> PLAY >> Generating TILES...");
    let tiles = new Builder(width, height, depth, ratio, iterations, tilesFilled).tiles;
    console.log("SCENE >> PLAY >> TILES Generated! OK.");
    
    console.log("SCENE >> PLAY >> Generating MAP...");
    this.map = new Map(tiles, this._player);
    console.log("SCENE >> PLAY >> MAP Generated! OK.");

    console.log("Starting ROT Engine! Here we go!");
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

    let visibleCells: { [key: string]: boolean } = {};
    let map = this.map;
    let currentDepth = this._player.z;
    map.getFov(this._player.z).compute(
      this._player.x, this._player.y, this._player.sightRadius, (x: number, y: number, r: number, vis: number) => {
        visibleCells[x+","+y] = true;
        map.setExplored(x, y, currentDepth, true);
      }
    );

    // Put bounds on the viewport movement relative to the map edge
    for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
      for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
        
        // Check if the cell is within FOV
        // if (visibleCells[x+','+y]) {
        //   let tile = this.map.getTile(x, y, this._player.z);
        //   display.draw(
        //       x - topLeftX,
        //       y - topLeftY,
        //       tile.char,
        //       tile.fg,
        //       tile.bg,
        //   );
        // }

        // Check if the cell has been explored
        if (map.isExplored(x, y, currentDepth)) {
          let tile = this.map.getTile(x, y, currentDepth);
          let foreground: string;

          // FIXME: This doesn't seem to be working...?
          if (visibleCells[x+','+y]) {
            foreground = tile.fg;
          } else {
            foreground = 'darkGray';
          }

          display.draw(
            x - topLeftX,
            y - topLeftY,
            tile.char,
            foreground,
            tile.bg
          );
        }
      }
    }

    // Render the player
    if (visibleCells[this._player.x + ',' + this._player.y]) {
      display.draw(
        this._player.x - topLeftX,
        this._player.y - topLeftY,
        this._player.char,
        this._player.fg,
        this._player.getBgTint(this._player.x, this._player.y, this._player.z, this.map)
        );
    }
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
    // console.log(this.map.explored);
  }
}


export { PlayScreen };