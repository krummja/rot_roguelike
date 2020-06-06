import { EventEmitter } from 'events';
import { Map } from '../Display';
import { Game } from '../Game';
import { IProperties } from '../types';
import { Entity } from './';

export class Mob extends Entity
{
  public properties: IProperties;
  public game: Game;
  public map: Map;

  constructor(properties: IProperties, game?: Game, map?: Map) 
  {
    super(properties);
    this.properties = properties;
    this.game       = game                || null;
    this.map        = map                 || null;
  }

  public setPosition(x: number, y: number, z: number): void
  {
    // FIXME: Position implementation? Needed?
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
      } 
    } 
    
    else if (z > this.z) {
      if (tile.traversable['open'] === true && 
          tile.traversable['direction'] === 'down') {
        this.setPosition(x, y, z);
      } 
    } 
    
    else if (target) {
      if (this.hasOwnProperty('attack')) {

        return true;
      } else {
        return false;
      }
    }

    else if (tile.walkable) {
      this.setPosition(x, y, z);
      return true;
    } 
    
    else if (tile.diggable) {
      map.dig(x, y, z);
      return true;
    }

    return false;
  };
}
