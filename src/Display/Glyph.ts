import { IProperties } from '../types';
import { Map } from './';

export class Glyph 
{
  public get char(): string { return this._character; }
  public set char(v: string) { this._character = v; }
  private _character: string;
  
  public get fg(): [number, number, number] { return this._foreground; }
  public set fg(v: [number, number, number]) { this._foreground = v; }
  private _foreground: [number, number, number];
  
  public get bg(): [number, number, number] { return this._background; }
  public set bg(v: [number, number, number]) { this._background = v; }
  private _background: [number, number, number];
  
  public get dbg(): [number, number, number] { return this._darkBackground; }
  public set dbg(v: [number, number, number]) { this._darkBackground = v; }
  private _darkBackground: [number, number, number];
  
  public get walkable(): boolean { return this._walkable; }
  public set walkable(v: boolean) { this._walkable = v; }
  private _walkable: boolean;
  
  public get diggable(): boolean { return this._diggable; }
  public set diggable(v: boolean) { this._diggable = v; }
  private _diggable: boolean;
  
  public get traversable(): { [key: string]: boolean | string; } { return this._traversable; }
  public set traversable(v: { [key: string]: boolean | string; }) { this._traversable = v; }
  private _traversable: { open?: boolean; direction?: string | undefined; };

  public get opaque(): boolean { return this._opaque; }
  public set opaque(value: boolean) { this._opaque = value; }
  private _opaque: boolean;
  
  public get map(): Map { return this._map; }
  public set map(value: Map) { this._map = value; }
  private _map: Map = null;
  
  
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
