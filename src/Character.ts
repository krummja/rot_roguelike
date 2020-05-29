import EventEmitter from 'events';
import { Metadatable } from './Metadatable';
import { Position } from './Position';
import { Properties } from './Properties';


/**
 * Base class for playable characters.
 */
class Character extends Metadatable(EventEmitter)
{
  private _name: string;
  private _position: Position;

  // Use internal getProperty.
  private _properties: Properties;

  public get name(): string { return this._name; }
  public get position(): Position { return this._position; }
  public set position(value: Position) { this._position = value; }

  constructor()
  {
    super();
    this._position = new Position(0, 0, 0);
  }
}


export { Character };