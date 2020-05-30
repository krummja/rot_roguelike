import * as ROT from 'rot-js';

import { Display } from './Interface/Display';
import { Input } from './Interface/Input';


class Game
{
  public display: Display;
  public input: Input;

  constructor()
  {
    this.display = new Display();
    document.getElementById('game')?.appendChild(this.display.container);

    this.input = new Input();
  }

  public initialize()
  {

  }
}


export { Game };