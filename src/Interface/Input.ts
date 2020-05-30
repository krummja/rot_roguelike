import * as ROT from 'rot-js';

import { Observer, Subject } from '../util';


class Input extends Subject
{
  public observers: Observer[] = [];
  public state: number;

  constructor()
  {
    super();

    let bindEventToScreen = (event: string): void => {
      window.addEventListener(event, (e: any): void => {
        this.handleInput(event, e);
      })
    }

    bindEventToScreen('keydown');
  }

  public handleInput(inputType: string, inputData: any): void
  {
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
        this.notify();
      } else if (inputData.keyCode === keyCommands.up) {
        this.notify();
      } else if (inputData.keyCode === keyCommands.down) {
        this.notify();
      } else if (inputData.keyCode === keyCommands.left) {
        this.notify();
      } else if (inputData.keyCode === keyCommands.right) {
        this.notify();
      } else if (inputData.keyCode === keyCommands.upleft) {
        this.notify();
      } else if (inputData.keyCode === keyCommands.upright) {
        this.notify();
      } else if (inputData.keyCode === keyCommands.downleft) {
        this.notify();
      } else if (inputData.keyCode === keyCommands.downright) {
        this.notify();
      }
    }
  }
}


export { Input };