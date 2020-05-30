import * as ROT from 'rot-js';

import { Scene } from './';

/**
 * This is the main renderer for the game. It handles all of the console's display lifecycle.
 * 
 */
class Renderer
{
  public get scene(): Scene { return this._scene; }
  private _scene: Scene;

  constructor()
  {

  }

  public clear(): void
  {

  }

  public refresh(): void
  {
    console.log("Refresh fired!");
  }

  public render(scene: Scene): void
  {
    this._scene = scene;
  }
}


export { Renderer };