import { StartScreen } from './Display';
import { Game } from './Game';
import { Interface } from './Interface';

window.onload = () => {
  let game = new Game();
  let startScreen: any = new StartScreen(game);

  let gameInterface = new Interface(game);

  game.init();
  game.switchScreen(startScreen);
}
