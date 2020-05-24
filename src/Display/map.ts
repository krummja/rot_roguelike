import * as ROT from 'rot-js';

import { Glyph, Tile } from './';


class Map
{
  private _tiles: Array<Array<Tile>>;
  private _width: number;
  private _height: number;

  public get tiles(): Array<Array<Tile>> { return this._tiles };
  public set tiles(v: Array<Array<Tile>>) { this._tiles = v };

  public get width(): number { return this._width };
  public set width(v: number) { this._width = v };

  public get height(): number { return this._height };
  public set height(v: number) { this._height = v };


  constructor(tiles: Array<Array<Tile>>)
  {
    this._tiles = tiles;
    this._width = tiles.length;
    this._height = tiles[0].length;
  }


  public static generate(map: Array<Array<Tile>>, width: number, height: number)
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

    return new Map(map);
  }

  public getTile(x: number, y: number): Tile
  {
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
      return Tile.nullTile();
    } else {
      return this._tiles[x][y] || Tile.nullTile();
    }
  }
}


export { Map };