import * as ROT from 'rot-js';
import Engine from 'rot-js/lib/engine';
import PreciseShadowcasting from 'rot-js/lib/fov/precise-shadowcasting';
import Scheduler from 'rot-js/lib/scheduler/scheduler';

import { Entity, Mob, Player } from '../ECS';
import { Tile } from './';
import { batTemplate } from '../ECS/Entities';
import { IScreen } from './Screen';

class Map
{
  public engine: Engine;
  public player: Player;
  public screen: IScreen;
  
  public get tiles(): Array<Array<Array<Tile>>> { return this._tiles; };
  public set tiles(v: Array<Array<Array<Tile>>>) { this._tiles = v; };
  private _tiles: Array<Array<Array<Tile>>>;
  
  public get width(): number { return this._width; };
  public set width(v: number) { this._width = v; };
  private _width: number;
  
  public get height(): number { return this._height; };
  public set height(v: number) { this._height = v; };
  private _height: number;
  
  public get entities(): {[key: string]: Entity} { return this._entities; }
  public set entities(value: {[key: string]: Entity}) { this._entities = value; }
  private _entities: {[key: string]: Entity};
  
  public get scheduler(): Scheduler { return this._scheduler; }
  public set scheduler(value: Scheduler) { this._scheduler = value; }
  private _scheduler: Scheduler;
  
  public get explored(): Array<Array<Array<boolean>>> { return this._explored; }
  private _explored: Array<Array<Array<boolean>>>;

  private _fov: PreciseShadowcasting[];
  private _depth: number;


  constructor(screen: IScreen, tiles: Array<Array<Array<Tile>>>, player: Player)
  {
    this._tiles = tiles;
    this._depth = tiles.length;
    this._width = tiles[0].length;
    this._height = tiles[0][0].length;
    this._entities = {};

    // Start the ROT Engine
    this._scheduler = new ROT.Scheduler.Simple();
    this.engine = new ROT.Engine(this._scheduler);
    
    this.screen = screen;

    // Initialize player
    this.addEntityAtRandomPosition(player, 0);

    // FIXME: This works, but the entity's actual position does not update. Need to refactor using a proper Manager.
    // Initialize mobs
    for (let z = 0; z < this._depth; z++) {
      for (let i = 0; i < 15; i++) {
        this.addEntityAtRandomPosition(new Mob(batTemplate, this.screen.game, this), z);
      }
    }    

    // Start FOV calculations
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

  public getBgTint(x: number, y: number, z: number, map: Map): [number, number, number] 
  {
    let tile = map.getTile(x, y, z);
    return tile.bg;
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
    let tile = this.getTile(x, y, z);
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
    return { x: x, y: y, z: z };
  }

  public getEntityAt(x: number, y: number, z: number): Entity
  {
    return this._entities[x + ',' + y + ',' + z];
  }

  public getEntitiesWithinRadius(x: number, y: number, z: number, radius: number)
  {
    let results = [];

    let leftX = x - radius;
    let rightX = x + radius;
    let topY = y - radius;
    let bottomY = y + radius;

    for (let key in this._entities) {
      let entity = this._entities[key];
      if (entity.x >= leftX && entity.x <= rightX &&
          entity.y >= topY  && entity.y <= bottomY &&
          entity.z == z) {
        results.push(entity);
      }
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

  public addEntity(entity: Entity)
  {
    entity.map = this;
    
    this.updateEntityPosition(entity);

    if (entity.hasOwnProperty('act')) {
      this._scheduler.add(entity, true);
    }
  }

  public removeEntity(entity: Entity)
  {
    let key = entity.x + ',' + entity.y + ',' + entity.z;
    if (this._entities[key] == entity) {
      delete this._entities[key];
    }

    if (entity.hasOwnProperty('act')) {
      this._scheduler.remove(entity);
    }
  }

  public setPosition(entity: Entity, x: number, y: number, z: number): void
  {
    let oldX = entity.x;
    let oldY = entity.y;
    let oldZ = entity.z;

    entity.x = x;
    entity.y = y;
    entity.z = z;

    this.updateEntityPosition(entity, oldX, oldY, oldZ);
  }

  public updateEntityPosition(entity: Entity, oldX?: number, oldY?: number, oldZ?: number)
  {    
    if (typeof(oldX) !== "undefined") {
      let oldKey = oldX + ',' + oldY + ',' + oldZ;
      if (this._entities[oldKey] == entity) {
        delete this._entities[oldKey];
      }
    }
  
    if (entity.x < 0 || entity.x >= this._width  ||
        entity.y < 0 || entity.y >= this._height ||
        entity.z < 0 || entity.z >= this._depth) {
      throw new Error('Entity\'s position is out of bounds.');
    }

    let key = entity.x + ',' + entity.y + ',' + entity.z;
    if (this._entities[key]) {
      throw new Error('Tried to add an entity at an occupied position.');
    }

    this._entities[key] = entity;
  }
}


export { Map };