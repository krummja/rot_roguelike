import * as ROT from 'rot-js';
import { IProperties } from '../types';
import { Map } from '.';
import { Game } from '../game';

class Glyph
{
  private _character: string;
  private _font: string;
  private _foreground: [number, number, number];
  private _background: [number, number, number];
  private _darkBackground: [number, number, number];
  private _walkable: boolean;
  private _diggable: boolean;
  private _traversable: {
    open?: boolean,
    direction?: string | undefined
  };
  private _opaque: boolean;
  private _map: Map = null;

  public get char(): string { return this._character; }
  public set char(v: string) { this._character = v; }

  public get fg(): [number, number, number] { return this._foreground; }
  public set fg(v: [number, number, number]) { this._foreground = v; }

  public get bg(): [number, number, number] { return this._background; }
  public set bg(v: [number, number, number]) { this._background = v; }

  public get dbg(): [number, number, number] { return this._darkBackground; }
  public set dbg(v: [number, number, number]) { this._darkBackground = v; }

  public get walkable(): boolean { return this._walkable; }
  public set walkable(v: boolean) { this._walkable = v; }

  public get diggable(): boolean { return this._diggable; }
  public set diggable(v: boolean) { this._diggable = v; }

  public get traversable(): { [key: string]: boolean | string } { return this._traversable; }
  public set traversable(v: { [key: string]: boolean | string }) { this._traversable = v; }

  public get opaque(): boolean { return this._opaque; }
  public set opaque(value: boolean) { this._opaque = value; }

  public get map(): Map { return this._map; }
  public set map(value: Map) { this._map = value; }


  constructor(properties: IProperties)
  {
    this._character = properties['character'] || ' ';
    this._foreground = properties['foreground'] || [255, 255, 255];
    this._background = properties['background'] || [255, 255, 255];
    this._darkBackground = properties['darkBackground'] || [255, 255, 255];
    this._walkable = properties['walkable'] || false;
    this._diggable = properties['diggable'] || false;
    this._traversable = properties['traversable'] || { open: false, direction: undefined };
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
    // let colors = ['#29231c', '#332d25', '#25211d', '#292018']
    let colors = [[41, 35, 28], [51, 45, 37], [37, 33, 29], [41, 32, 24]]
    
    return new Tile({
      character: ' ',
      background: this.pickColor(colors),
      walkable: true,
      traversable: {
        open: false,
        direction: undefined
      },
      opaque: false,
    });
  }

  public static wallTile(): Tile
  {
    // let colors = ['#9a7e61', '#a78a6d', '#a08467', '#ad9173'];
    let colors = [[154, 126, 97], [167, 138, 109], [160, 132, 103], [173, 145, 115]]

    return new Tile({
      character: ' ',
      background: this.pickColor(colors),
      diggable: true,
      traversable: {
        open: false,
        direction: undefined
      },
      opaque: true
    });
  }

  public static stairsUpTile(): Tile
  {
    let colors = [[41, 35, 28], [51, 45, 37], [37, 33, 29], [41, 32, 24]]

    return new Tile({
      character: '▲',
      foreground: [255, 255, 255],
      background: this.pickColor(colors),
      walkable: true,
      traversable: {
        open: true,
        direction: 'up'
      },
      opaque: false
    })
  }

  public static stairsDownTile(): Tile
  {
    let colors = [[41, 35, 28], [51, 45, 37], [37, 33, 29], [41, 32, 24]]

    return new Tile({
      character: '▼',
      foreground: [200, 200, 200],
      background: this.pickColor(colors),
      walkable: true,
      traversable: {
        open: true,
        direction: 'down'
      },
      opaque: false
    })
  }


  public static pickColor: Function = (colors: Array<Array<number>>): number[] => {
    let index = Math.floor(Tile.random(0, 4));
    return colors[index];
  };

  public static random: Function = (mn: number, mx: number): number => {
    return Math.random() * (mx - mn) + mn;
  }

}


export { Tile };
export { Glyph };