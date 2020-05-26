import { IProperties } from '../types';
import { Map } from './';

class Glyph
{
  private _char: string;
  private _font: string;
  private _fg: string;
  private _bg: string;
  private _walkable: boolean;
  private _diggable: boolean;
  private _blocksLight: boolean;
  private _map: Map = null;

  public get char(): string { return this._char; }
  public set char(v: string) { this._char = v; }

  public get fg(): string { return this._fg; }
  public set fg(v: string) { this._fg = v; }

  public get bg(): string { return this._bg; }
  public set bg(v: string) { this._bg = v; }

  public get walkable(): boolean { return this._walkable; }
  public set walkable(v: boolean) { this._walkable = v; }

  public get diggable(): boolean { return this._diggable; }
  public set diggable(v: boolean) { this._diggable = v; }

  public get blocksLight(): boolean { return this._blocksLight; }
  public set blocksLight(value: boolean) { this._blocksLight = value; }

  public get map(): Map { return this._map; }
  public set map(value: Map) { this._map = value; }

  constructor(properties: IProperties)
  {
    this._char = properties['character'] || ' ';
    this._fg = properties['foreground'] || 'white';
    this._bg = properties['background'] || 'black';
    this._walkable = properties['isWalkable'] || false;
    this._diggable = properties['isDiggable'] || false;
    this._blocksLight = (properties['blocksLight'] !== undefined) ? properties['blocksLight'] : true;
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
      isWalkable: true,
      blocksLight: false
    });
  }

  public static wallTile(): Tile
  {
    let colors = ['#9a7e61', '#a78a6d', '#a08467', '#ad9173'];

    return new Tile({
      character: ' ',
      background: this.pickColor(colors),
      isDiggable: true,
      blocksLight: true
    });
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