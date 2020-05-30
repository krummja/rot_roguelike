import * as ROT from 'rot-js';


class Display
{
  public container: HTMLElement | null;

  public get display(): ROT.Display { return this._display; }
  public set display(v: ROT.Display) { this._display = v; }
  private _display: ROT.Display = null;


  constructor()
  {
    this.display = new ROT.Display({
      width: 64,
      height: 40,
      fontFamily: 'Fira Code',
      fontStyle: 'normal',
      spacing: 1.0,
      forceSquareRatio: true
    });

    this.container = this.display.getContainer();
  }
}


export { Display };