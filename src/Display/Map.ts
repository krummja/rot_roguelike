import * as ROT from 'rot-js';
import * as ECS from '../ECS';
import { Game } from '../Game';
import { Tile } from './';
import Scheduler from 'rot-js/lib/scheduler/scheduler';

/**
 * The MAP class is a single discrete area in the game.
 * Its primary function is to set up and track ENTITY positions.
 * It also handles the checking of TILE data like flags for digging or FOV calculation.
 */
class Map
{
  private _tiles: Array<Array<Tile>>;

  // Cache the width and height based on the tile array dimensions.
  private _width: number;
  private _height: number;
  private _depth: number;
  private _entities: Array<ECS.Entity>;

  // Private reference to the Core Engine and Scheduler.
  private _Engine: ROT.Engine = Game.ROT_ENGINE;
  private _Scheduler: Scheduler = Game.SCHEDULER;


  constructor(tileArray: Array<Array<Tile>>)
  {
    this._tiles    = tileArray;
    this._width    = tileArray.length;
    this._height   = tileArray[0].length;
    this._entities = [];

    this._Engine = Game.ROT_ENGINE;
  }


  public static generate(tileArray: Array<Array<Tile>>, width: number, height: number)
  {
    // FIXME: Move all of this to the World system. Everything here should be for tracking entities.

    // let generator = new ROT.Map.Cellular(width, height);
    // generator.randomize(0.5); // 0-1 empty-full
    
    // let iterations = 3;
    // for (let i = 0; i < iterations - 1; i++) {
    //   generator.create();  
    // }

    // generator.create((x: number, y: number, v: number) => {
    //   if (v === 1) {
    //     tileArray[x][y] = Tile.floorTile();
    //   } else {
    //     tileArray[x][y] = Tile.wallTile();
    //   }
    // });

    // return new Map(tileArray);
  }
}