import * as ROT from 'rot-js';
import Engine from 'rot-js/lib/engine';
import Scheduler from 'rot-js/lib/scheduler/scheduler';
import { Player, Tile, Entity, Actor } from './';


class Map
{
  private _tiles: Array<Array<Array<Tile>>>;
  private _entities: Array<Entity>;
  private _scheduler: Scheduler;
  private _width: number;
  private _height: number;
  private _depth: number;

  public engine: Engine;

  public player: Player;

  public get tiles(): Array<Array<Array<Tile>>> { return this._tiles };
  public set tiles(v: Array<Array<Array<Tile>>>) { this._tiles = v };

  public get width(): number { return this._width };
  public set width(v: number) { this._width = v };

  public get height(): number { return this._height };
  public set height(v: number) { this._height = v };

  public get entities(): Array<Entity> { return this._entities; }
  public set entities(value: Array<Entity>) { this._entities = value; }

  public get scheduler(): Scheduler { return this._scheduler; }
  public set scheduler(value: Scheduler) { this._scheduler = value; }

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
  }

  public getTile(x: number, y: number, z: number): Tile
  {
    if (x < 0 || x >= this._width ||
        y < 0 || y >= this._height ||
        z < 0 || z >= this._depth) {
      return Tile.nullTile();
    } else {
      return this.tiles[z][x][y] || Tile.nullTile();
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