import * as ROT from 'rot-js';
import * as Display from '../../Display';


export class Builder
{
  private _tileArray: Array<Array<Display.Tile>>;
  private _mapWidth: number;
  private _mapHeight: number;

  constructor(width: number, height: number)
  {
    this._tileArray = [];
    this._mapWidth = width;
    this._mapHeight = height;
  }


  public generateTileArray(): Array<Array<Display.Tile>>
  {
    for (let x = 0; x < this._mapWidth; x++) {
      this._tileArray.push([]);
      for (let y = 0; y < this._mapHeight; y++) {
        this._tileArray[x].push(Display.Tile.nullTile());
      }
    }
    return this._tileArray;
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
}