import * as ROT from 'rot-js';
import Engine from 'rot-js/lib/engine';
import Scheduler from 'rot-js/lib/scheduler/scheduler';
import { Player, Tile, Entity, Actor } from './';


class Map
{
  private _tiles: Array<Array<Tile>>;
  private _entities: Array<Entity>;
  private _scheduler: Scheduler;
  private _engine: Engine;
  private _width: number;
  private _height: number;

  public player: Player;

  public get tiles(): Array<Array<Tile>> { return this._tiles };
  public set tiles(v: Array<Array<Tile>>) { this._tiles = v };

  public get width(): number { return this._width };
  public set width(v: number) { this._width = v };

  public get height(): number { return this._height };
  public set height(v: number) { this._height = v };

  public get entities(): Array<Entity> { return this._entities; }
  public set entities(value: Array<Entity>) { this._entities = value; }


  public get engine(): Engine { return this._engine; }
  public set engine(value: Engine) { this._engine = value; }

  public get scheduler(): Scheduler { return this._scheduler; }
  public set scheduler(value: Scheduler) { this._scheduler = value; }

  constructor(tiles: Array<Array<Tile>>, player: Player)
  {
    this._tiles = tiles;
    this._width = tiles.length;
    this._height = tiles[0].length;
    this._entities = [];
    this._scheduler = new ROT.Scheduler.Simple();
    this._engine = new ROT.Engine(this._scheduler);
    this.addEntityAtRandomLocation(player);
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

  public getEntityAt(x: number, y: number): Entity | boolean
  {
    for (let i = 0; i < this._entities.length; i++) {
      if (this._entities[i].x == x && this._entities[i].y == y) {
        return this._entities[i];
      }
    }
    return false;
  }

  public addEntity(entity: Entity)
  {
    if (entity.x < 0 || entity.y >= this._width || entity.y < 0 || entity.y >= this._height) {
      throw new Error('Adding entity out of bounds');
    }

    entity.map = this;
    this._entities.push(entity);
    if (entity.hasOwnProperty('act')) {
      this._scheduler.add(entity, true);
    }
  }

  public addEntityAtRandomLocation(entity: Entity): void
  {
    let position = this.getRandomFloorPosition();
    entity.x = position.x;
    entity.y = position.y;
    this.addEntity(entity);
  }
}


export { Map };