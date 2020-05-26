import * as ROT from 'rot-js';
import { Game} from './game';
import { Tile } from './Display';
import { shuffleCoordArray } from './utils';

type Map = Array<Array<Tile>>;
type Connection = { [key: string]: boolean };

class Builder
{
  private readonly _width: number;
  private readonly _height: number;
  private _depth: number;
  private _tiles: Map[];
  private readonly _regions: Array<Array<Array<number>>>;


  public get width(): number { return this._width; }
  public get height(): number { return this._height; }

  public get depth(): number { return this._depth; }
  public set depth(value: number) { this._depth = value; }

  public get tiles(): Map[] { return this._tiles; }
  public set tiles(value: Map[]) { this._tiles = value; }



  constructor(width: number, height: number, depth: number)
  {
    this._width = width;
    this._height = height;
    this._depth = depth;

    this._tiles = new Array(depth);
    this._regions = new Array(depth);

    for (let z = 0; z < depth; z++) {
      this._tiles[z] = this._generateLevel();
      this._regions[z] = new Array(width);
      for (let x = 0; x < width; x++) {
        this._regions[z][x] = new Array(height);
        for (let y = 0; y < height; y++) {
          this._regions[z][x][y] = 0;
        }
      }
    }

    for (let z = 0; z < this._depth; z++) {
      this._setupRegions(z);
    }
    this._connectAllRegions();
  }

  private _generateLevel(): Map
  {
    // Generate a 2D Array to represent all of the tiles on a map;
    let map = new Array(this._width);
    for (let w = 0; w < this._width; w++) {
      map[w] = new Array(this._height);
    }

    let generator = new ROT.Map.Cellular(this._width, this._height);
    generator.randomize(5);
    let totalIterations = 3;
    for (let i = 0; i < totalIterations - 1; i++) {
      generator.create();
    }

    generator.create((x: number, y: number, v: number): void => {
      if (v === 1) {
        map[x][y] = Tile.floorTile();
      } else {
        map[x][y] = Tile.wallTile();
      }
    })

    return map;
  }

  private _canFillRegion(x: number, y: number, z: number): boolean
  {
    // Check if the tile is within the world boundaries.
    if (x < 0 || y < 0 || z < 0 || x >= this._width || y >= this._height || z >= this._depth) {
      return false;
    }
    // Check if the tile already has a region assigned to it.
    if (this._regions[z][x][y] != 0) {
      return false;
    }
    // Flag the tile as walkable.
    return this._tiles[z][x][y].walkable;
  }

  private _fillRegion(region: number, x: number, y: number, z: number): number
  {
    let tilesFilled = 1;
    let tiles: Array<{x: number, y: number}> = [{x: x, y: y}];
    let tile: {x: number, y: number};
    let neighbors: Array<{x: number, y: number}>;

    this._regions[z][x][y] = region;
    while (tiles.length > 0) {
      tile = tiles.pop();
      neighbors = Game.getNeighborPositions(tile.x, tile.y);
      while (neighbors.length > 0) {
        tile = neighbors.pop();
        if (this._canFillRegion(tile.x, tile.y, z)) {
          this._regions[z][tile.x][tile.y] = region;
          tiles.push(tile);
          tilesFilled++;
        }
      }
    }
    return tilesFilled;
  }

  private _removeRegion(region: number, z: number)
  {
    for (let x = 0; x < this._width; x++) {
      for (let y = 0; y < this._height; y++) {
        if (this._regions[z][x][y] == region) {
          this._regions[z][x][y] = 0;
          this._tiles[z][x][y] = Tile.wallTile();
        }
      }
    }
  }

  private _setupRegions(z: number)
  {
    let region = 1;
    let tilesFilled;

    for (let x = 0; x < this._width; x++) {
      for (let y = 0; y < this._height; y++) {
        if (this._canFillRegion(x, y, z)) {
          tilesFilled = this._fillRegion(region, x, y, z);
          if (tilesFilled <= 20) {
            this._removeRegion(region, z);
          } else {
            region++;
          }
        }
      }
    }
  }

  public _findRegionOverlaps(z: number, r1: number, r2: number)
  {
    let matches: Array<{x: number, y: number}> = [];
    for (let x = 0; x < this._width; x++) {
      for (let y = 0; y < this._height; y++) {
        if (this._tiles[z][x][y].walkable &&
            this._tiles[z+1][x][y].walkable &&
            this._regions[z][x][y] == r1 &&
            this._regions[z+1][x][y] == r2) {
          matches.push({x: x, y: y});
        }
      }
    }
    return matches
  }

  public _connectRegions(z: number, r1: number, r2: number): boolean
  {
    let overlap = this._findRegionOverlaps(z, r1, r2);

    if (overlap.length == 0) {
      return false;
    }

    let point = overlap[0];
    this._tiles[z][point.x][point.y] = Tile.stairsDownTile();
    this._tiles[z+1][point.x][point.y] = Tile.stairsUpTile();
    return true;
  }

  private _connectAllRegions()
  {
    for (let z = 0; z < this._depth - 1; z++) {
      let connected: Connection = {};
      let key: string;
      for (let x = 0; x < this._width; x++) {
        for (let y = 0; y < this._height; y++) {
          key = this._regions[z][x][y] + ',' + this._regions[z+1][x][y];
          if (this._tiles[z][x][y].walkable && this._tiles[z+1][x][y].walkable && !connected[key]) {
            this._connectRegions(z, this._regions[z][x][y], this._regions[z+1][x][y]);
            connected[key] = true;
          }
        }
      }
    }
  }

}


export { Builder };