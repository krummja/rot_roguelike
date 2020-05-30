import * as ROT from 'rot-js';
import { Game } from '../Game';

import { Scene, StartScene, PlayScene } from './';


class SceneManager
{
  public get game(): Game { return this._game; }
  private _game: Game;

  constructor(game: Game)
  {
    this._game = game;
  }

  public switch(scene: Scene): void
  {
    if (this._game.currentScene !== null) {
      this._game.currentScene.exit();
    }

    this._game.console.renderer.clear();
    this._game.currentScene = scene;

    if (this._game.currentScene) {
      this._game.currentScene.enter();
      this._game.console.renderer.refresh();
    }
  }
}


export { SceneManager };