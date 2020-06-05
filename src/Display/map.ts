import * as ROT from 'rot-js';
import Engine from 'rot-js/lib/engine';
import Scheduler from 'rot-js/lib/scheduler/scheduler';
import { Player, Tile, Entity, Actor } from '.';
import PreciseShadowcasting from 'rot-js/lib/fov/precise-shadowcasting';


class Map
{
  public engine: Engine;
  public player: Player;
  
  public get tiles(): Array<Array<Array<Tile>>> { return this._tiles };
  public set tiles(v: Array<Array<Array<Tile>>>) { this._tiles = v };
  private _tiles: Array<Array<Array<Tile>>>;
  
  public get width(): number { return this._width };
  public set width(v: number) { this._width = v };
  private _width: number;
  
  public get height(): number { return this._height };
  public set height(v: number) { this._height = v };
  private _height: number;
  
  public get entities(): Array<Entity> { return this._entities; }
  public set entities(value: Array<Entity>) { this._entities = value; }
  private _entities: Array<Entity>;
  
  public get scheduler(): Scheduler { return this._scheduler; }
  public set scheduler(value: Scheduler) { this._scheduler = value; }
  private _scheduler: Scheduler;
  
  public get explored(): Array<Array<Array<boolean>>> { return this._explored; }
  private _explored: Array<Array<Array<boolean>>>;

  private _fov: PreciseShadowcasting[];
  private _depth: number;

  constructor(tiles: Array<Array<Array<Tile>>>, player: Player)
  {
    this._tiles = tiles;
    this._depth = tiles.length;
    this._width = tiles[0].length;
    this._height = tiles[0][0].length;
    this._entities = [];
    this._scheduler = new ROT.Scheduler.Simple();
    this.engine = new ROT.Engine(this._scheduler);
    this.addEntityAtRandomPosition(player, 0);

    this._fov = [];
    this.setupFov();

    this._explored = new Array(this._depth);
    this.setupExploredArray();
  }


  public getTile(x: number, y: number, z: number): Tile
  {
    if (x < 0 || x >= this._width   ||
        y < 0 || y >= this._height  ||
        z < 0 || z >= this._depth) {
      return Tile.nullTile();
    } else {
      return this.tiles[z][x][y] || Tile.nullTile();
    }
  }

  public setupFov() 
  {
    let map = this;
    for (let z = 0; z < this._depth; z++) {
      (function() {
        let depth = z;
        map._fov.push(new ROT.FOV.PreciseShadowcasting((x: number, y: number): boolean => {
          return !map.getTile(x, y, depth).opaque;
        }, {topology: 4}));
      })();
    }
  }

  public getFov(depth: number)
  {
    return this._fov[depth];
  }

  public setupExploredArray()
  {
    for (let z = 0; z < this._depth; z++) {
      this._explored[z] = new Array(this._width);
      for (let x = 0; x < this._width; x++) {
        this._explored[z][x] = new Array(this._height);
          for (let y = 0; y < this._height; y++) {
            this._explored[z][x][y] = false;
        }
      }
    }
  }

  public setExplored(x: number, y: number, z: number, state: boolean) 
  {
    let tile = this.getTile(x, y, z)
    if (tile.walkable || tile.diggable || tile.traversable['open'] === true) {
      this._explored[z][x][y] = state;
    }
  }

  public isExplored(x: number, y: number, z: number) 
  {
    if (this.getTile(x, y, z) !== Tile.nullTile()) {
      return this._explored[z][x][y];
    } else {
      return false;
    }
  }

  public dig(x: number, y: number, z: number): void
  {
    if (this.getTile(x, y, z).diggable) {
      this.tiles[z][x][y] = Tile.floorTile();
    }
  }

  public getRandomFloorPosition(z: number): { x: number, y: number, z: number }
  {
    let x = 0;
    let y = 0;

    while (this.getTile(x, y, z).walkable === false) {
      x = Math.floor(Math.random() * this._width);
      y = Math.floor(Math.random() * this._height);
    }
    return { x: x, y: y, z: z }
  }

  public getEntityAt(x: number, y: number, z: number): Entity | boolean
  {
    for (let i = 0; i < this._entities.length; i++) {
      if (this._entities[i].x == x &&
          this._entities[i].y == y &&
          this._entities[i].z == z) {
        return this._entities[i];
      }
    }
    return false;
  }

  public addEntity(entity: Entity): void
  {
    if (entity.x < 0 || entity.x >= this._width ||
        entity.y < 0 || entity.y >= this._height ||
        entity.z < 0 || entity.z >= this._depth) {
      throw new Error('Adding entity out of bounds');
    }

    entity.map = this;
    this._entities.push(entity);
    if (entity.hasOwnProperty('act')) {
      this._scheduler.add(entity, true);
    }
  }

  public addEntityAtRandomPosition(entity: Entity, z: number): void
  {
    let position = this.getRandomFloorPosition(z);
    entity.x = position.x;
    entity.y = position.y;
    entity.z = position.z;
    this.addEntity(entity);
  }
}


export { Map };