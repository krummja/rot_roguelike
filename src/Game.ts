import * as ROT from 'rot-js';
import { EventEmitter } from 'events';

import { Screen } from './types';
import { MessageManager } from './MessageManager';

class Game
{
  public container: HTMLElement | null;
  public messageManager: MessageManager;
  
  public static EVENTS: EventEmitter = new EventEmitter();
   
  public get display(): ROT.Display { return this._display; }
  public set display(v: ROT.Display) { this._display = v; }
  private _display: ROT.Display = null;
  
  public get currentScreen(): Screen { return this._currentScreen; }
  public set currentScreen(v: Screen) { this._currentScreen = v; }
  private _currentScreen: Screen = null;
  
  public get screenWidth(): number { return this._screenWidth; }
  public set screenWidth(v: number) { this._screenWidth = v; }
  private _screenWidth: number = 100;
  
  public get screenHeight(): number { return this._screenHeight; }
  public set screenHeight(v: number) { this._screenHeight = v; }
  private _screenHeight: number = 60;
  
  private _fontFamily: string = 'Fira Code';
  private _fontStyle: string = 'normal';
  private _spacing: number = 1.0;
  private _squareRatio: boolean = true;
  

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

    this.messageManager = new MessageManager(this);
  }


  public init(): void
  {
    let game = this;
    let bindEventToScreen = (event: string): void => {
      window.addEventListener(event, (e: any): void => {
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
    if (this._currentScreen !== null) {
      this._currentScreen.exit();
    }
    
    this._display.clear();
    this._currentScreen = screen;
    if (this._currentScreen) {
      this._currentScreen.enter();
      this.refresh();
    }
  }
}


export {Game};