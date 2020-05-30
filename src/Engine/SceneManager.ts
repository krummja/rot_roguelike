import * as ROT from 'rot-js';
import { Game } from './Game';

import { Scene } from './Scene';


/**
 * The SceneManager handles the setup, execution, and garbage collection of game scene objects.
 */
class SceneManager
{
  private _game: Game;

  public get game(): Game { return this._game; }
  public set game(value: Game) { this._game = value; }

  constructor(game: Game)
  {
    this._game = game;
  }


  public switch(scene: Scene): void
  {
    if (this.game.currentScene !== null) {
      this.game.currentScene.exit();
    }

    this.game.renderer.clear();
    this.game.currentScene = scene;
    if (this.game.currentScene) {
      this.game.currentScene.enter();
      this.game.renderer.refresh();
    }
  }
}


export { SceneManager };