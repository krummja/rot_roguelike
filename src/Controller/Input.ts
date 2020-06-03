import * as ROT from 'rot-js';
import * as Engine from '../Engine';


export class Input
{
  private _CORE: Engine.Core;

  constructor(core: Engine.Core)
  {
    this._CORE = core;
  }


  public initialize()
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
    if (inputType === 'keydown') {
      if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
        this._CORE.EVENTS.emit('return');
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD8) {
        this._CORE.EVENTS.emit('up');
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD2) {
        this._CORE.EVENTS.emit('down');
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD4) {
        this._CORE.EVENTS.emit('left');
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD6) {
        this._CORE.EVENTS.emit('right');
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD7) {
        this._CORE.EVENTS.emit('upleft');
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD9) {
        this._CORE.EVENTS.emit('upright');
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD1) {
        this._CORE.EVENTS.emit('downleft');
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD3) {
        this._CORE.EVENTS.emit('downright');
      }
    }
  }
}
