import { Game } from './Game';
import { Display } from './Interface/Display';
import { Input } from './Interface/Input';


window.onload = (): void => {
  let game = new Game();
  game.initialize();
}