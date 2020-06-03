import { Glyph, IGlyph } from './Glyph';


// Base properties relevant to the Tile class properties.
export interface ITile
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


export class Tile
{
  public get glyph(): Glyph { return this._glyph; }
  private readonly _glyph: Glyph;

  private _walkable : boolean;
  private _diggable : boolean;
  private _opaque   : boolean;
  private _x        : number;
  private _y        : number;

  private readonly _glyphProps: IGlyph;

  constructor(physicsProps: ITile, glyphProps: IGlyph)
  {
    // Mutables: Physics and Position
    this._walkable = physicsProps['walkable'];
    this._diggable = physicsProps['diggable'];
    this._opaque   = physicsProps['opaque'];
    this._x        = physicsProps['x'];
    this._y        = physicsProps['y'];

    // Immutables: Renderables
    this._glyphProps = glyphProps;
    this._glyph = new Glyph(this._glyphProps);
  }

  public static nullTile(): Tile
  {
    return new Tile({}, {});
  }

  public static floorTile(): Tile
  {
    let colors = ['#29231c', '#332d25', '#25211d', '#292018']
    return new Tile({
      walkable: true,
      opaque: false
    }, {
      character: ' ',
      background: this.pickColor(colors)
    });
  }

  public static wallTile(): Tile
  {
    let colors = ['#9a7e61', '#a78a6d', '#a08467', '#ad9173'];
    return new Tile({
      walkable: false,
      opaque: true
    }, {
      character: ' ',
      background: this.pickColor(colors)
    });
  }

  public static pickColor: Function = (colors: string[]): string => {
    let index = Math.floor(Tile.random(0, 4));
    return colors[index];
  }
  
  public static random: Function = (mn: number, mx: number): number => {
    return Math.random() * (mx - mn) + mn;
  }
}