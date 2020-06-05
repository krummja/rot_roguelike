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
  
  public init(properties: IProperties): void
  {
    this.properties = properties;
    this.x = this.properties['x'];
    this.y = this.properties['y'];
    this.z = this.properties['z'];

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
        } else {
          console.log("You can't ascend here!");
          
        }
      } else if (z > this.z) {
        if (tile.traversable['open'] === true && tile.traversable['direction'] === 'down') {
          this.x = x;
          this.y = y;
          this.z = z;
        } else {
          console.log("You can't descend here!");
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

    this.getBgTint = (
      x: number, 
      y: number, 
      z: number, 
      map: Map
    ): [number, number, number] => {
      let tile = map.getTile(x, y, z);
      return tile.bg;
    }
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
  public get messages(): Array<string> { return this._messages; }
  private _messages: Array<string>;

  public receiveMessage: (message: string) => void;
  public clearMessages: () => void;

  public init()
  {
    this._messages = [];
    this.receiveMessage = (message: string): void => {
      this._messages.push(message);
    }
    this.clearMessages = (): void => {
      if (this._messages.length >= 2) {
        this._messages.shift();
      }
    }
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
      this.clearMessages();
    }
  }
}

