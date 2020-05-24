import * as ROT from 'rot-js';

import { Glyph } from './';

class Tile
{
  private _glyph: Glyph;

  public get glyph(): Glyph { return this._glyph };
  public set glyph(v: Glyph) { this._glyph = v };


  constructor(glyph: Glyph)
  {
    this._glyph = glyph;
  }


  public static nullTile(): Tile
  {
    return new Tile(new Glyph());
  }
  public static floorTile(): Tile
  {
    return new Tile(new Glyph('.'));
  }
  public static wallTile(): Tile
  {
    return new Tile(new Glyph('#', 'goldenrod'));
  }
}


export { Tile };