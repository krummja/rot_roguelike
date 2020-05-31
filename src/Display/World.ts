import * as ROT from 'rot-js';
import * as ECS from '../ECS';
import { Tile } from '.';

/**
 * The WORLD class is a representation consisting of one or more MAP structures.
 * A Map is generated for each region of the world, and for each Map a set of tiles
 * is generated and assembled.
 * 
 * The World contains all of the data necessary for other parts of the game's systems to
 * query information like tile state (passable, opaque, diggable), as well as set flags that
 * may be relevant to handling Entity behaviors.
 * 
 */
class World
{
  public tileArray: Array<Array<Tile>>;
  
  private _width: number;
  private _height: number;

  constructor()
  {
    this.tileArray = [];

    // Initialize the 2D array with null tiles.
    for (let x = 0; x < this._width; x++) { 
      this.tileArray.push([]);
      for (let y = 0; y < this._height; y++) {
        this.tileArray[x].push(Tile.nullTile());
      }
    }
  }
}



export { World };