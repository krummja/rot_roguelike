import * as ROT from 'rot-js';

import { Game } from '../Game';
import { IScreen, PlayScreen } from './';

class StartScreen implements IScreen
{
  public game: Game;


  constructor(game: Game)
  {
    this.game = game;
  }


  public enter()
  {
    console.log("StartScreen.enter: Entered start screen.");
  }

  public exit(): void
  {
    console.log("StartScreen.exit:  Exited start screen.");
  }

  public render(display: ROT.Display): void
  {
    display.drawText(1, 1, "%c{yellow}TypeScript Roguelike");
    display.drawText(1, 2, "Press [Enter] to start!");

    display.drawText(1, 4, "Use Numpad Arrows (2, 4, 6, 8) to Navigate.");
    display.drawText(1, 5, "Use Numpad 7 to Ascend, Numpad 1 to Descend.");
  }

  public handleInput(inputType: string, inputData: any): void
  {
    if (inputType === 'keydown')
    {
      if (inputData.keyCode === ROT.KEYS.VK_RETURN)
      {
        let play = new PlayScreen(this.game);
        this.game.switchScreen(play);
      }
    }
  }
}


export { StartScreen };