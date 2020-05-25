import * as ROT from 'rot-js';

import { Glyph } from './';
import { IProperties } from '../types';


class Tile extends Glyph
{


  constructor(properties: IProperties)
  {
    super(properties)
  }


  public static nullTile(): Tile
  {
    return new Tile({});
  }

  public static floorTile(): Tile
  {
    return new Tile({
      character: '.',
      isWalkable: true
    });
  }

  public static wallTile(): Tile
  {
    return new Tile({
      character: '#',
      foreground: 'goldenrod',
      isDiggable: true
    });
  }
}


export { Tile };