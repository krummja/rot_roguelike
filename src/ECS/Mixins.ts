import { EventEmitter } from 'events';
import { settings } from 'ts-mixer';

import { Map } from '../Display';
import { Game } from '../Game';
import { IProperties } from '../types';

settings.prototypeStrategy = 'copy';
settings.initFunction = 'init';


interface IMixin
{
  properties?: IProperties;
  init(properties: IProperties): void;
}


export class Moveable implements IMixin
{
  public properties: IProperties;

  public x: number;
  public y: number;
  public z: number;

  public tryMove: (x: number, y: number, z: number, ...args: any[]) => boolean;
  public getBgTint: (x: number, y: number, z: number, ...args: any[]) => [number, number, number];
  
  private _EVENTS: EventEmitter;

  public init(properties: IProperties): void
  {
    this.properties = properties;
    this.x = this.properties['x'];
    this.y = this.properties['y'];
    this.z = this.properties['z'];

    this._EVENTS = Game.EVENTS;

    this.tryMove = (
      x: number, 
      y: number, 
      z: number,
      map: Map
    ): boolean => {
      let tile = map.getTile(x, y, this.z);

      if (z < this.z) {
        if (tile.traversable['open'] === true && tile.traversable['direction'] === 'up') {
          this.x = x;
          this.y = y;
          this.z = z;
          this._EVENTS.emit('tryMove', 'You follow the passage upward.');
        } else {
           this._EVENTS.emit('tryMove', 'You can\'t ascend here!');
        }
      } else if (z > this.z) {
        if (tile.traversable['open'] === true && tile.traversable['direction'] === 'down') {
          this.x = x;
          this.y = y;
          this.z = z;
          this._EVENTS.emit('tryMove', 'You follow the passage downward.');
        } else {
          this._EVENTS.emit('tryMove', 'You can\'t descend here!');
        }
      } else if (tile.walkable) {
        this.x = x;
        this.y = y;
        this.z = z;
        this._EVENTS.emit('tryMove', "");
        return true;
      } else if (tile.diggable) {
        map.dig(x, y, z);
        this._EVENTS.emit('tryMove', 'The stone gives and crumbles at your feet!');
        return true;
      }
      return false;
    };

    this.getBgTint = (
      x: number, 
      y: number, 
      z: number, 
      map: Map
    ): [number, number, number] => {
      let tile = map.getTile(x, y, z);
      return tile.bg;
    };
  }
}


export class Sight implements IMixin
{
  public properties: IProperties;

  public get sightRadius(): number { return this._sightRadius; }
  public set sightRadius(value: number) { this._sightRadius = value; }
  private _sightRadius: number;

  public init(properties: IProperties)
  {
    this.properties = properties;
    this._sightRadius = properties['sightRadius'] || 5;
  }
}


export class Recipient implements IMixin
{
  public get messages(): {[key: string]: Array<string>} { return this._messages; }
  private _messages: {[key: string]: Array<string>};

  public receiveMessage: (sender: string, message: string) => void;
  public clearMessages: (buffer: number) => void;

  public init()
  {
    this._messages = {
      position: [],
      tryMove: ['', '', '', ''],
      combat: []
    }
    this.receiveMessage = (sender: string, message: string): void => {
      this._messages[sender].push(message);
    };
  }
}


export class Actor extends Recipient implements IMixin
{
  public game: Game;
  public map: Map;
  public act: () => void;

  public init()
  {
    this.act = (): void => {
      this.game.refresh();
      this.map.engine.lock();
      this.game.messageManager.clearMessages(0, 'position');
      this.game.messageManager.clearMessages(4, 'tryMove', true);
    };
  }
}


export class Combatant implements IMixin
{
  public init()
  {
    
  }
}