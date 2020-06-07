import { Glyph, Map } from '../Display';
import { Game } from '../Game';
import { IProperties } from '../types';

export class Entity extends Glyph 
{
  public properties: IProperties;
  public game: Game;
  public map: Map;

  public get name(): string { return this._name; }
  public set name(v: string) { this._name = v; }
  private _name: string;

  public get x(): number { return this._x; }
  public set x(v: number) { this._x = v; }
  private _x: number;

  public get y(): number { return this._y; }
  public set y(v: number) { this._y = v; }
  private _y: number;

  public get z(): number { return this._z; }
  public set z(v: number) { this._z = v; }
  private _z: number;

  constructor(properties: IProperties, game?: Game, map?: Map) 
  {
    super(properties);
    this.properties = properties;
    this._name      = properties['name']  || ' ';
    this._x         = properties['x']     || 0;
    this._y         = properties['y']     || 0;
    this._z         = properties['z']     || 0;
    this.game       = game                || null;
    this.map        = map                 || null;
  }
}
