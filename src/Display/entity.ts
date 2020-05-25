import { Mixin, settings } from 'ts-mixer';

settings.initFunction = 'init';

import {Glyph} from '../Display';
import {Constructor, IProperties} from '../types';


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

function HitCounter<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    name: string;
    multiplier: number;
    hits: number;
    incrementHit: Function;
    getHitCount: Function;

    constructor(...args: any[]) {
      super(...args);
      this.name = "HitCounter";
      this.multiplier = 1;
      this.hits = 0;
      this.incrementHit = (): void => { this.hits += this.multiplier; }
      this.getHitCount = (): number => { return this.hits; }
    }
  }
}





export { Entity };