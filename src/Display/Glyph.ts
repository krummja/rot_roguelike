export interface IGlyph
{
  character  ?: string;
  font       ?: string;
  foreground ?: string;
  background ?: string;
}

export class Glyph
{
  private _font: string;
  
  public get character(): string { return this._character; }
  public set character(v: string) { this._character = v; }
  private _character: string;
  
  public get foreground(): string { return this._foreground; }
  public set foreground(v: string) { this._foreground = v; }
  private _foreground: string;
  
  public get background(): string { return this._background; }
  public set background(v: string) { this._background = v; }
  private _background: string;

  constructor(properties: IGlyph) 
  {
    this._character   = properties['character'];
    // Add a disjunction that grabs a global font config if local is undefined/null.
    this._font        = properties['font'];
    this._foreground  = properties['foreground'];
    this._background  = properties['background'];
  }
}