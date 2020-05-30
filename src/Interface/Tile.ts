import * as ROT from 'rot-js';
import { Glyph } from './Glyph';
import { IProperties } from '../typings';


class Tile extends Glyph
{
  public walkable: boolean;
  public diggable: boolean;
  public traversable: boolean;
  public opaque: boolean;

  constructor(properties: IProperties)
  {
    super(properties);

    this.walkable     = properties['walkable']    || false;
    this.diggable     = properties['diggable']    || false;
    this.traversable  = properties['traversable'] || false;
    this.opaque       = properties['opaque']      || true;
  }
}


export { Tile };