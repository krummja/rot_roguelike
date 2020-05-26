import * as ROT from 'rot-js';
import {Screen} from './types';


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
    console.log('Game:              Setting up game instance. One sec...');
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
          game.display.clear();
          game.currentScreen.render(game.display);
        }
      });
    };

    bindEventToScreen('keydown');

    console.log('Game.init:         Game successfully initialized on port 8080.');
  }

  public switchScreen(screen: Screen): void
  {
    if (this.currentScreen !== null) {
      console.log('Game.switchScreen: A scene is running. Exiting first...');
      this.currentScreen.exit();
      console.log('Game.switchScreen: OK, continuing.');
    }

    this.display.clear();
    this.currentScreen = screen;
    if (this.currentScreen) {
      console.log('Game.switchScreen: Either no prior screen, or first init.');
      this.currentScreen.enter();
      console.log('Game.switchScreen: Starting renderer.');
      this.currentScreen.render(this.display);
    }
  }
}


export {Game};