import * as ROT from 'rot-js';
import { Subject, Observer } from './Util';


class Input
{
  public subject: Subject = new Subject();

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
    let inputState: number = null;

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
        inputState = keyCommands.return;
      } else if (inputData.keyCode === keyCommands.up) {
        inputState = keyCommands.up;
      } else if (inputData.keyCode === keyCommands.down) {
        inputState = keyCommands.down;
      } else if (inputData.keyCode === keyCommands.left) {
        inputState = keyCommands.left;
      } else if (inputData.keyCode === keyCommands.right) {
        inputState = keyCommands.right;
      } else if (inputData.keyCode === keyCommands.upleft) {
        inputState = keyCommands.upleft;
      } else if (inputData.keyCode === keyCommands.upright) {
        inputState = keyCommands.upright;
      } else if (inputData.keyCode === keyCommands.downleft) {
        inputState = keyCommands.downleft;
      } else if (inputData.keyCode === keyCommands.downright) {
        inputState = keyCommands.downright;
      }
      this.subject.notify();
    }
  }
}


export { Input };