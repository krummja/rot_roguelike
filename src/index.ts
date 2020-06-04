import * as ROT from 'rot-js';

import { Game } from './game';
import { StartScreen } from './Display';
import { Interface } from './Interface';

window.onload = () => {
  let game = new Game();
  let startScreen: any = new StartScreen(game);

  let gameInterface = new Interface(game);

  game.init();
  game.switchScreen(startScreen);
}
