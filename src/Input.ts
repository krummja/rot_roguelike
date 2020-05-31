import * as ROT from 'rot-js';
import * as ECS from './ECS';

import { Game } from './Game';


class Input
{
  public state: number;

  constructor()
  {
    let bindEventToScreen = (event: string): void => {
      window.addEventListener(event, (e: any): void => {
        this.handleInput(event, e);
      })
    }

    bindEventToScreen('keydown');
  }

  public handleInput(inputType: string, inputData: any): void
  {
    this.state = null;

    let keyCommands = {
      return: ROT.KEYS.VK_RETURN,
      up: ROT.KEYS.VK_NUMPAD8,
      down: ROT.KEYS.VK_NUMPAD2,
      left: ROT.KEYS.VK_NUMPAD4,
      right: ROT.KEYS.VK_NUMPAD6,
      upleft: ROT.KEYS.VK_NUMPAD7,
      upright: ROT.KEYS.VK_NUMPAD9,
      downleft: ROT.KEYS.VK_NUMPAD1,
      downright: ROT.KEYS.VK_NUMPAD3
    }

    if (inputType === 'keydown') {
      if (inputData.keyCode === keyCommands.return) {
        this.state = keyCommands.return;
      } else if (inputData.keyCode === keyCommands.up) {
        this.state = keyCommands.up;
      } else if (inputData.keyCode === keyCommands.down) {
        this.state = keyCommands.down;
      } else if (inputData.keyCode === keyCommands.left) {
        this.state = keyCommands.left;
      } else if (inputData.keyCode === keyCommands.right) {
        this.state = keyCommands.right;
      } else if (inputData.keyCode === keyCommands.upleft) {
        this.state = keyCommands.upleft;
      } else if (inputData.keyCode === keyCommands.upright) {
        this.state = keyCommands.upright;
      } else if (inputData.keyCode === keyCommands.downleft) {
        this.state = keyCommands.downleft;
      } else if (inputData.keyCode === keyCommands.downright) {
        this.state = keyCommands.downright;
      }

      Game.EVENTS.emit('input', this.state);
    }
  }
}


export { Input };