import { Mixin, settings } from 'ts-mixer';

import { IProperties } from '../types';
import { Map, Glyph } from './';

settings.prototypeStrategy = 'copy';
settings.initFunction = 'init';

class Entity extends Glyph
{
  private _name: string;
  private _x: number;
  private _y: number;

  public properties: IProperties;
  public attachedMixins: any[];

  public get name(): string { return this._name; }
  public set name(v: string) { this._name = v; }

  public get x(): number { return this._x; }
  public set x(v: number) { this._x = v; }

  public get y(): number { return this._y; }
  public set y(v: number) { this._y = v; }


  constructor(properties: IProperties)
  {
    super(properties);

    // These are props not in Glyph that we're adding.
    this._name = properties['name'] || ' ';
    this._x = properties['x'] || 0;
    this._y = properties['y'] || 0;
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
  public properties: IProperties;
  public tryMove: Function;
  public getBgTint: Function;

  constructor(properties: IProperties)
  {
    this.properties = properties;
    this.x = this.properties['x'];
    this.y = this.properties['y'];
  }

  protected init(properties: IProperties): void
  {
    this.tryMove = (x: number, y: number, map: Map): boolean => {
      let tile = map.getTile(x, y);
      if (tile.walkable) {
        this.x = x;
        this.y = y;
        return true;
      } else if (tile.diggable) {
        map.dig(x, y);
        return true;
      }
      return false;
    }
    this.getBgTint = (x: number, y: number, map: Map): string => {
      let tile = map.getTile(x, y);
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


class Player extends Mixin(Entity, Moveable, Sight) {}


export { Entity, Player };