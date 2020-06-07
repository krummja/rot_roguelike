import { EventEmitter } from 'events';
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

  private _EVENTS: EventEmitter;

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

    this._EVENTS = Game.EVENTS;
  }

  public setPosition(x: number, y: number, z: number): void
  {
    let oldX = this._x;
    let oldY = this._y;
    let oldZ = this._z;

    this._x = x;
    this._y = y;
    this._z = z;

    if (this.map) {
      this.map.updateEntityPosition(this, oldX, oldY, oldZ);
    }
  }

  public tryMove(x: number, y: number, z: number): boolean
  {
    let map = this.map;
    let tile = map.getTile(x, y, this.z);
    let target = map.getEntityAt(x, y, this.z);

    if (z < this.z) {
      if (tile.traversable['open'] === true && 
          tile.traversable['direction'] === 'up') {
        this.setPosition(x, y, z);
        this._EVENTS.emit('tryMove', 'You follow the passage upward.');
      } 
      
      else {
        this._EVENTS.emit('tryMove', 'You can\'t ascend here!');
      }
    } 
    
    else if (z > this.z) {
      if (tile.traversable['open'] === true && 
          tile.traversable['direction'] === 'down') {
        this.setPosition(x, y, z);
        this._EVENTS.emit('tryMove', 'You follow the passage downward.');
      } 
      
      else {
        this._EVENTS.emit('tryMove', 'You can\'t descend here!');
      }
    } 
    
    else if (target) {
      if (this.hasOwnProperty('attack')) {
        this._EVENTS.emit('attack', this, target);
        return true;
      } else {
        return false;
      }
    }

    else if (tile.walkable) {
      this.setPosition(x, y, z);
      this._EVENTS.emit('tryMove', "");
      return true;
    } 
    
    else if (tile.diggable) {
      map.dig(x, y, z);
      this._EVENTS.emit('tryMove', 'The stone gives and crumbles at your feet!');
      return true;
    }

    return false;
  };
}
