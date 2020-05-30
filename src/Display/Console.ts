import * as ROT from 'rot-js';
import { Glyph, Renderer, Scene, Tile } from './';


class Console
{
  public container: HTMLElement | null;

  public get display(): ROT.Display { return this._display; }
  private _display: ROT.Display = null;

  public get renderer(): Renderer { return this._renderer; }
  private _renderer: Renderer = null;

  constructor()
  {
    this._display = new ROT.Display({
      width: 64,
      height: 40,
      fontFamily: 'Fira Code',
      fontStyle: 'normal',
      spacing: 1.0,
      forceSquareRatio: true
    });

    this.container = this._display.getContainer();
    document.getElementById('game')?.appendChild(this.container);
    this._renderer = new Renderer();

    // Renderer Test
    var foreground, background, colors;
    for (let i = 0; i < 15; i++) {
      foreground = ROT.Color.toRGB([255 - (i*20), 255 - (i*20), 255 - (i*20)]);
      background = ROT.Color.toRGB([i*20, i*20, i*20]);
      colors = "%c{" + foreground + "}%b{" + background + "}";
      this._display.drawText(2, i, colors + "Hello World!");
    }
  }
}


export { Console };