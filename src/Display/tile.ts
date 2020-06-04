import { IProperties } from '../types';
import { Map } from '.';
import { Game } from '../game';

class Glyph
{
  private _character: string;
  private _font: string;
  private _foreground: string;
  private _background: string;
  private _walkable: boolean;
  private _diggable: boolean;
  private _traversable: boolean;
  private _opaque: boolean;
  private _map: Map = null;

  public get char(): string { return this._character; }
  public set char(v: string) { this._character = v; }

  public get fg(): string { return this._foreground; }
  public set fg(v: string) { this._foreground = v; }

  public get bg(): string { return this._background; }
  public set bg(v: string) { this._background = v; }

  public get walkable(): boolean { return this._walkable; }
  public set walkable(v: boolean) { this._walkable = v; }

  public get diggable(): boolean { return this._diggable; }
  public set diggable(v: boolean) { this._diggable = v; }

  public get traversable(): boolean { return this._traversable; }
  public set traversable(v: boolean) { this._traversable = v; }

  public get opaque(): boolean { return this._opaque; }
  public set opaque(value: boolean) { this._opaque = value; }

  public get map(): Map { return this._map; }
  public set map(value: Map) { this._map = value; }

  constructor(properties: IProperties)
  {
    this._character = properties['character'] || ' ';
    this._foreground = properties['foreground'] || 'white';
    this._background = properties['background'] || 'black';
    this._walkable = properties['walkable'] || false;
    this._diggable = properties['diggable'] || false;
    this._traversable = properties['traversable'] || false;
    this._opaque = (properties['opaque'] !== undefined) ? properties['opaque'] : true;
  }
}


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
    let colors = ['#29231c', '#332d25', '#25211d', '#292018']

    return new Tile({
      character: ' ',
      background: this.pickColor(colors),
      walkable: true,
      traversable: false,
      opaque: false,
    });
  }

  public static wallTile(): Tile
  {
    let colors = ['#9a7e61', '#a78a6d', '#a08467', '#ad9173'];

    return new Tile({
      character: ' ',
      background: this.pickColor(colors),
      diggable: true,
      traversable: false,
      opaque: true
    });
  }

  public static stairsUpTile(): Tile
  {
    return new Tile({
      character: '<',
      foreground: 'white',
      walkable: true,
      traversable: true,
      opaque: false
    })
  }

  public static stairsDownTile(): Tile
  {
    return new Tile({
      character: '>',
      foreground: 'gray',
      walkable: true,
      traversable: true,
      opaque: false
    })
  }


  public static pickColor: Function = (colors: string[]): string => {
    let index = Math.floor(Tile.random(0, 4));
    return colors[index];
  };

  public static random: Function = (mn: number, mx: number): number => {
    return Math.random() * (mx - mn) + mn;
  }

}




export { Tile };
export { Glyph };