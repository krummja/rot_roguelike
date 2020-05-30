import { Glyph, IGlyph } from './Glyph';

// Base properties relevant to the Tile class properties.
interface ITile
{
  // Mutables: Physics and Position
  walkable   ?: boolean;
  diggable   ?: boolean;
  opaque     ?: boolean;
  x          ?: number;
  y          ?: number;
  
  // Immutables: Renderables
  glyphProps ?: IGlyph;
}


class Tile
{
  private _walkable: boolean;
  private _diggable : boolean;
  private _opaque   : boolean;
  private _x        : number;
  private _y        : number;

  private readonly _glyph: Glyph;
  private readonly _glyphProps: IGlyph;

  constructor(properties: ITile, glyphProps: IGlyph)
  {
    // Mutables: Physics and Position
    this._walkable = properties['walkable'];
    this._diggable = properties['diggable'];
    this._opaque   = properties['opaque'];
    this._x        = properties['x'];
    this._y        = properties['y'];

    // Immutables: Renderables
    this._glyphProps = glyphProps;
    this._glyph = new Glyph(this._glyphProps);
  }
}


export { Tile };