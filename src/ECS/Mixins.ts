import { settings } from 'ts-mixer';

import { Map } from '../Display';
import { Game } from '../Game';
import { IProperties, Position } from '../types';
import { Entity } from '.';

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
        }
      } else if (z > this.z) {
        if (tile.traversable['open'] === true && tile.traversable['direction'] === 'down') {
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


export class PlayerActor implements IMixin
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


export class MobActor implements IMixin
{
  public properties: IProperties;
  
  public game: Game;
  public map: Map;
  public position: Position;
  public act: () => void;
  public tryMove: (x: number, y: number, z: number) => boolean;
  
  public init()
  {
    this.position = this.properties['position'];
    this.act = (): void => {
      this.game.refresh();
      this.map.engine.lock();
    }
  }
}


export class WanderActor implements IMixin
{
  public properties: IProperties;
  public position: Position;

  public tryMove: (x: number, y: number, z: number) => boolean;

  public init()
  {
    this.position = this.properties['position'];

    let moveOffset = (Math.round(Math.random()) === 1) ? 1 : -1;
    if (Math.round(Math.random()) === 1) {
      this.tryMove(this.position['x'] + moveOffset, this.position['y'], this.position['z']);
    } else {
      this.tryMove(this.position['x'], this.position['y'] + moveOffset, this.position['z']);
    }
  }
}


export class Combatant implements IMixin
{
  public attack: (attacker: Entity, target: Entity) => void;
  
  public init()
  {
    Game.EVENTS.on("attack", (attacker: Entity, target: Entity) => {
      this.attack(attacker, target);
    });

    this.attack = (attacker: Entity, target: Entity): void => {

    }
  }
}