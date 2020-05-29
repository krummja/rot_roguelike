import { Renderer } from './Renderer';
import { Scene } from './Scene';
import { SceneManager } from './SceneManager';
import { StartScene } from './Scenes';

const START = new StartScene();

class Game
{
  private _currentScene: Scene;
  private _renderer: Renderer;
  private _sceneManager: SceneManager;

  public get currentScene(): Scene { return this._currentScene; }
  public set currentScene(value: Scene) { this._currentScene = value; }

  public get renderer(): Renderer { return this._renderer; }

  public get sceneManager(): SceneManager { return this._sceneManager; }
  public set sceneManager(value: SceneManager) { this._sceneManager = value; }

  constructor()
  {
    this._renderer = new Renderer(this);
    this._sceneManager = new SceneManager(this);
  }


  public init(): void
  {
    this._sceneManager.switch(START);
  }
}


export { Game };