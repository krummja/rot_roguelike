import * as ROT from 'rot-js';
import { Glyph, Tile } from './';


class Console
{
  public container: HTMLElement | null;

  public get display(): ROT.Display { return this._display; }
  private _display: ROT.Display = null;

  private _consoleConfig = {
    width: 64,
    height: 40,
    fontFamily: 'Fira Code',
    fontStyle: 'normal',
    spacing: 1.0,
    forceSquareRatio: true
  }


  constructor()
  {
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


  public clear(): void
  {

  }

  public render(): void
  {
    let screenWidth = this._consoleConfig['width'];
    let screenHeight = this._consoleConfig['height'];

    this._display.drawText(20, 20, 'Hello world!');
  }
}


export { Console };