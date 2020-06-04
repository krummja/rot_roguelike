import { Mixin, settings } from 'ts-mixer';

import { IProperties } from '../types';
import { Map, Glyph, Tile } from './';
import { Game } from '../game';

settings.prototypeStrategy = 'copy';
settings.initFunction = 'init';

class Entity extends Glyph
{
  private _name: string;
  private _x: number;
  private _y: number;
  private _z: number;

  public properties: IProperties;
  public attachedMixins: any[];

  // I think the movement system is changing the Entity base class's x,y,z values...

  public get name(): string { return this._name; }
  public set name(v: string) { this._name = v; }

  public get x(): number { return this._x; }
  public set x(v: number) { this._x = v; }

  public get y(): number { return this._y; }
  public set y(v: number) { this._y = v; }

  public get z(): number { return this._z; }
  public set z(v: number) { this._z = v; }


  constructor(properties: IProperties)
  {
    super(properties);

    this._name = properties['name'] || ' ';
    this._x = properties['x'] || 0;
    this._y = properties['y'] || 0;
    this._z = properties['z'] || 0;
    this.map = null;
  }

  public setPosition(x: number, y: number, z: number): void
  {
    this._x = x;
    this._y = y;
    this._z = z;
  }
}



class HitCounter
{
  private readonly _multiplier: number;
  private _totalHits: number;

  public incrementHit: Function;
  public getTotalHits: Function;


  constructor(properties: IProperties)
  {
    this._multiplier = properties["multiplier"];
    this._totalHits = 0;
    this.incrementHit = (): void => { this._totalHits += this._multiplier; }
    this.getTotalHits = (): number => { return this._totalHits; }
  }
}

class Combatant extends Mixin(Entity, HitCounter) {}


class Moveable
{
  public x: number;
  public y: number;
  public z: number;
  public properties: IProperties;
  public tryMove: Function;
  public getBgTint: Function;

  constructor(properties: IProperties)
  {
    this.properties = properties;
    this.x = this.properties['x'];
    this.y = this.properties['y'];
    this.z = this.properties['z'];
  }

  protected init(properties: IProperties): void
  {
    this.tryMove = (x: number, y: number, z: number, map: Map): boolean => {
      let tile = map.getTile(x, y, this.z);

      if (z < this.z) {
        if (!tile.traversable) {
          console.log("You can't ascend here!");
        } else {
          this.x = x;
          this.y = y;
          this.z = z;
        }
      } else if (z > this.z) {
        if (!tile.traversable) {
          console.log("You can't descend here!");
        } else {
          this.x = x;
          this.y = y;
          this.z = z;
        }
      } else if (tile.walkable) {
        this.x = x;
        this.y = y;
        this.z = z;
        return true;
      } else if (tile.diggable) {
        map.dig(x, y, z);
        return true;
      }
      return false;
    }
    this.getBgTint = (x: number, y: number, z: number, map: Map): string => {
      let tile = map.getTile(x, y, z);
      return tile.bg;
    }
  }
}


class Sight
{
  private _sightRadius: number;

  public properties: IProperties;
  public get sightRadius(): number { return this._sightRadius; }
  public set sightRadius(value: number) { this._sightRadius = value; }

  constructor(properties: IProperties)
  {
    this.properties = properties;
    this._sightRadius = properties['sightRadius'];
  }

  protected init(properties: IProperties): void
  {
    this._sightRadius = properties['sightRadius'] || 5;
  }
}

class Actor
{
  public act: Function;
  public properties: IProperties;
  public game: Game;
  public map: Map;

  constructor(properties: IProperties, game: Game, map: Map)
  {
    this.properties = properties;
    this.game = game;
    this.map = map;
  }

  protected init(properties: IProperties)
  {
    this.act = (): void => {
      this.game.refresh();
      this.map.engine.lock();
    }
  }
}


class Player extends Mixin(Entity, Moveable, Sight, Actor) {}
class Mob extends Mixin(Entity, Moveable, Actor) {}

export { Entity, Player, Mob, Actor };