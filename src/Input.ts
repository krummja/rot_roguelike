import { EventEmitter } from 'events';
import * as ROT from 'rot-js';

class Input extends EventEmitter
{
  constructor()
  {
    super();
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
        this.emit('input', 'return');
      } else if (inputData.keyCode === keyCommands.up) {
        this.emit('move', 'up');
      } else if (inputData.keyCode === keyCommands.down) {
        this.emit('move', 'down');
      } else if (inputData.keyCode === keyCommands.left) {
        this.emit('move', 'left');
      } else if (inputData.keyCode === keyCommands.right) {
        this.emit('move', 'right');
      } else if (inputData.keyCode === keyCommands.upleft) {
        this.emit('move', 'upleft');
      } else if (inputData.keyCode === keyCommands.upright) {
        this.emit('move', 'upright');
      } else if (inputData.keyCode === keyCommands.downleft) {
        this.emit('move', 'downleft');
      } else if (inputData.keyCode === keyCommands.downright) {
        this.emit('move', 'downright');
      }
    }
  }
}


export { Input };