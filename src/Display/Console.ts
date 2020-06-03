import * as ROT from 'rot-js';
import * as Engine from '../Engine';
import { Glyph, Tile } from './';


export class Console
{
  public container: HTMLElement | null;

  public get display(): ROT.Display { return this._display; }
  private _display: ROT.Display = null;

  public get width(): number { return this._consoleConfig.width; }
  public get height(): number { return this._consoleConfig.height; }

  private _core: Engine.Core;

  private _consoleConfig = {
    width: 64,
    height: 40,
    fontFamily: 'Fira Code',
    fontStyle: 'normal',
    spacing: 1.0,
    forceSquareRatio: true
  }


  constructor(core: Engine.Core)
  {
    this._core = core;

    this._display = new ROT.Display({
      width: this._consoleConfig['width'],
      height: this._consoleConfig['height'],
      fontFamily: this._consoleConfig['fontFamily'],
      fontStyle: this._consoleConfig['fontStyle'],
      spacing: this._consoleConfig['spacing'],
      forceSquareRatio: this._consoleConfig['forceSquareRatio']
    });

    this.container = this._display.getContainer();
    document.getElementById('game')?.appendChild(this.container);
  }
}