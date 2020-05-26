import * as ROT from 'rot-js';
import { Player, Tile } from './';


class Map
{
  private _tiles: Array<Array<Tile>>;
  private _width: number;
  private _height: number;

  public player: Player;

  public get tiles(): Array<Array<Tile>> { return this._tiles };
  public set tiles(v: Array<Array<Tile>>) { this._tiles = v };

  public get width(): number { return this._width };
  public set width(v: number) { this._width = v };

  public get height(): number { return this._height };
  public set height(v: number) { this._height = v };

  constructor(tiles: Array<Array<Tile>>, player: Player)
  {
    this._tiles = tiles;
    this._width = tiles.length;
    this._height = tiles[0].length;
    this.player = player;
  }

  public static generate(map: Array<Array<Tile>>, width: number, height: number, player: Player)
  {
    let generator = new ROT.Map.Cellular(width, height);
    generator.randomize(0.5);

    let totalIterations = 3;
    for (let i = 0; i < totalIterations - 1; i++) {
      generator.create();
    }

    generator.create((x, y, v) => {
      if (v === 1) {
        map[x][y] = Tile.floorTile();
      } else {
        map[x][y] = Tile.wallTile();
      }
    })
    return new Map(map, player);
  }

  public dig(x: number, y: number): void
  {
    if (this.getTile(x, y).diggable) {
      this.tiles[x][y] = Tile.floorTile();
    }
  }

  public getRandomFloorPosition(): { x: number, y: number }
  {
    let x = 0;
    let y = 0;

    while (this.getTile(x, y).walkable === false) {
      x = Math.floor(Math.random() * this._width);
      y = Math.floor(Math.random() * this._height);
    }
    return { x: x, y: y }
  }

  public getTile(x: number, y: number): Tile
  {
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
      return Tile.nullTile();
    } else {
      return this.tiles[x][y] || Tile.nullTile();
    }
  }
}


export { Map };