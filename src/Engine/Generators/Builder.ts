import * as ROT from 'rot-js';
import * as Display from '../../Display';

// TODO: Refactor much of this - make a MapManager.
export class Builder
{
  public tileArray: Array<Array<Display.Tile>>;

  public width(): number { return this._mapWidth; }
  private _mapWidth: number;

  public height(): number { return this._mapHeight; }
  private _mapHeight: number;

  constructor(width: number, height: number)
  {
    this.tileArray = [];
    this._mapWidth = width;
    this._mapHeight = height;
  }


  public generateTileArray(): Array<Array<Display.Tile>>
  {
    for (let x = 0; x < this._mapWidth; x++) {
      this.tileArray.push([]);
      for (let y = 0; y < this._mapHeight; y++) {
        this.tileArray[x].push(Display.Tile.nullTile());
      }
    }
    return this.tileArray;
  }

  public generateArea(tileArray: Array<Array<Display.Tile>>)
  {
    let generator = new ROT.Map.Cellular(this._mapWidth, this._mapHeight);
    generator.randomize(0.5);

    let iterations = 3;
    for (let i = 0; i < iterations - 1; i++) {
      generator.create();
    }

    generator.create((x, y, v) => {
      if (v === 1) {
        tileArray[x][y] = Display.Tile.floorTile();
      } else {
        tileArray[x][y] = Display.Tile.wallTile();
      }
    })
    return tileArray;
  }

  public getTile(x: number, y: number): Display.Tile
  {
    if (x < 0 || x >= this._mapWidth || y < 0 || y >= this._mapHeight) {
      return Display.Tile.nullTile();
    } else {
      return this.tileArray[x][y] || Display.Tile.nullTile();
    }
  }
}