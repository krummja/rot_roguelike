import * as ROT from 'rot-js';
import {Screen} from './types';
import { Console } from './console';


class Game
{
  private _console: Console = null;
  private _currentScreen: Screen = null;
  private _screenWidth: number = 64;
  private _screenHeight: number = 40;
  private _fontFamily: string = 'Fira Code';
  private _fontStyle: string = 'normal';
  private _fontSize: number = 12;
  private _spacing: number = 1.0;
  private _squareRatio: boolean = true;

  public container: HTMLElement | null;


  public get console(): Console { return this._console; }
  public set console(v: Console) { this._console = v; }

  public get currentScreen(): Screen { return this._currentScreen; }
  public set currentScreen(v: Screen) { this._currentScreen = v; }

  public get screenWidth(): number { return this._screenWidth; }
  public set screenWidth(v: number) { this._screenWidth = v; }

  public get screenHeight(): number { return this._screenHeight; }
  public set screenHeight(v: number) { this._screenHeight = v; }


  public constructor()
  {
    console.log('Game:              Setting up game instance. One sec...');

    this.console = new Console();
    document.getElementById('game')?.appendChild(this.console.container);
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
  }

  public refresh(): void
  {
    // this._console.clear();
    // this._currentScreen.render((this._console));
  }

  public switchScreen(screen: Screen): void
  {
    // TODO: Refactor this into the render system.

    // if (this.currentScreen !== null) {
    //   this.currentScreen.exit();
    // }

    // this.console.clear();
    // this.currentScreen = screen;
    // if (this.currentScreen) {
    //   this.currentScreen.enter();
    //   this.refresh()
    // }
  }
}


export {Game};