import { IProperties } from '../types';


class Glyph
{
  private _char: string;
  private _fg: string;
  private _bg: string;
  private _walkable: boolean;
  private _diggable: boolean;

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

  constructor(properties: IProperties)
  {
    this._char = properties['character'] || ' ';
    this._fg = properties['foreground'] || 'white';
    this._bg = properties['background'] || 'black';
    this._walkable = properties['isWalkable'] || false;
    this._diggable = properties['isDiggable'] || false;
  }
}


export { Glyph};