import * as ROT from 'rot-js';
import { Renderer } from './renderer';

class Console
{
  public container: HTMLElement | null;

  private _display: ROT.Display = null;
  private _screenWidth: number = 64;
  private _screenHeight: number = 40;
  private _fontFamily: string = 'Fira Code';
  private _fontStyle: string = 'normal';
  private _spacing: number = 1.0;
  private _squareRatio: boolean = true;
  private _renderer: Renderer;

  constructor()
  {
    this._display = new ROT.Display({
      width: this._screenWidth,
      height: this._screenHeight,
      fontFamily: this._fontFamily,
      fontStyle: this._fontStyle,
      spacing: this._spacing,
      forceSquareRatio: this._squareRatio
    });
    this._renderer = new Renderer();

    this.container = this._display.getContainer();
  }

  public refresh(): void
  {
    this._display.clear();
    
  }
}


export { Console };