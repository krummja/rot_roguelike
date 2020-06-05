import { vsprintf } from 'sprintf';
import * as ROT from 'rot-js';
import {Screen} from './types';
import { shuffleCoordArray } from './utils';
import { Player } from './Display';


class Game
{
  private _display: ROT.Display = null;
  private _currentScreen: Screen = null;
  private _screenWidth: number = 64;
  private _screenHeight: number = 40;
  private _fontFamily: string = 'Fira Code';
  private _fontStyle: string = 'normal';
  private _fontSize: number = 12;
  private _spacing: number = 1.0;
  private _squareRatio: boolean = true;

  public container: HTMLElement | null;


  public get display(): ROT.Display { return this._display; }
  public set display(v: ROT.Display) { this._display = v; }

  public get currentScreen(): Screen { return this._currentScreen; }
  public set currentScreen(v: Screen) { this._currentScreen = v; }

  public get screenWidth(): number { return this._screenWidth; }
  public set screenWidth(v: number) { this._screenWidth = v; }

  public get screenHeight(): number { return this._screenHeight; }
  public set screenHeight(v: number) { this._screenHeight = v; }


  public constructor()
  {
    this.display = new ROT.Display({
      width: this._screenWidth,
      height: this._screenHeight,
      fontFamily: this._fontFamily,
      fontStyle: this._fontStyle,
      spacing: this._spacing,
      forceSquareRatio: this._squareRatio
    });
    this.container = this.display.getContainer();
    document.getElementById('game')?.appendChild(this.container);
  }


  public init(): void
  {
    let game = this;
    let bindEventToScreen = (event: string): void =>
    {
      window.addEventListener(event, (e: any): void =>
      {
        if (game.currentScreen !== null) {
          game.currentScreen.handleInput(event, e);
        }
      });
    };

    bindEventToScreen('keydown');
    bindEventToScreen('keypress');
  }

  public refresh(): void
  {
    this._display.clear();
    this._currentScreen.render((this._display));
  }

  public switchScreen(screen: Screen): void
  {
    if (this.currentScreen !== null) {
      this.currentScreen.exit();
    }

    this.display.clear();
    this.currentScreen = screen;
    if (this.currentScreen) {
      this.currentScreen.enter();
      this.refresh()
    }
  }

  public static getNeighborPositions(x: number, y: number): Array<{x: number, y: number}>
  {
    let tiles: Array<{x: number, y: number}> = [];
    for (let dX = -1; dX < 2; dX++) {
      for (let dY = -1; dY < 2; dY++) {
        if (dX == 0 && dY == 0) {
          continue;
        }
        tiles.push({x: x + dX, y: y + dY});
      }
    }
    return shuffleCoordArray(tiles);
  }

  public sendMessage(recipient: Player, message: string, args: any)
  {
    message = vsprintf(message, args);
    recipient.receiveMessage(message);
  }
}


export {Game};