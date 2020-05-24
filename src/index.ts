import * as ROT from 'rot-js';

import { Game } from './game';
import { StartScreen } from './Display';

window.onload = () => {
  let game = new Game();
  let startScreen: any = new StartScreen(game);

  game.init();
  game.switchScreen(startScreen);
}
