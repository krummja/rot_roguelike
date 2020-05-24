import * as ROT from 'rot-js';


class Glyph
{
  private _char: string;
  private _fg: string;
  private _bg: string;

  get char(): string { return this._char };
  set char(v: string) { this._char = v };

  get fg(): string { return this._fg };
  set fg(v: string) { this._fg = v };

  get bg(): string { return this._bg };
  set bg(v: string) { this._bg = v };


  constructor(char?: string, fg?: string, bg?: string)
  {
    if (char || fg || bg) {
      this._char = char;
      this._fg = fg;
      this._bg = bg;
    } else {
      this._char = '';
    }
  }
}


export { Glyph };