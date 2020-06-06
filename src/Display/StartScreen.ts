import { EventEmitter } from 'events';
import * as ROT from 'rot-js';

import { Game } from '../Game';
import { IScreen, PlayScreen } from './';

class StartScreen implements IScreen
{
  public game: Game;
  public key: string = "START";

  private _EVENTS: EventEmitter;

  constructor(game: Game)
  {
    this.game = game;
    this._EVENTS = Game.EVENTS;
  }


  public enter()
  {
    this._EVENTS.emit('ready');
  }

  public exit(): void
  {
    this.game.display.drawText(1, 20, "Loading...");
  }

  public render(display: ROT.Display): void
  {
    display.drawText(1, 1, "%c{yellow}TypeScript Roguelike");
    display.drawText(1, 2, "Press [Enter] to start!");

    display.drawText(1, 4, "Numpad Controls:");

    display.drawText(1,  6, "----- ----- -----");
    display.drawText(1,  7, "|7  | |8  | |9  |")
    display.drawText(1,  8, "| %c{red}UP%c{}| |  %c{red}N%c{}| |   |");
    display.drawText(1,  9, "----- ----- -----");
    display.drawText(1, 10, "----- ----- -----");
    display.drawText(1, 11, "|4  | |5  | |6  |")
    display.drawText(1, 12, "|  %c{red}W%c{}| |   | |  %c{red}E%c{}|");
    display.drawText(1, 13, "----- ----- -----");
    display.drawText(1, 14, "----- ----- -----");
    display.drawText(1, 15, "|1  | |2  | |3  |");
    display.drawText(1, 16, "| %c{red}DN%c{}| |  %c{red}S%c{}| |   |");
    display.drawText(1, 17, "----- ----- -----");
  }

  public handleInput(inputType: string, inputData: any): void
  {
    if (inputType === 'keydown')
    {
      if (inputData.keyCode === ROT.KEYS.VK_RETURN)
      {
        this.game.display.drawText(1, 20, "Loading...");
        
        let start = this;
        setTimeout(()=>{
          let play = new PlayScreen(start.game);
          start.game.switchScreen(play);
        }, 3000);
      }
    }
  }
}


export { StartScreen };