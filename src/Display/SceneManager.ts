import { Scene, StartScene, PlayScene } from './';


class SceneManager
{
  public scenes: { [key: string]: Scene };
  
  public get currentScene(): Scene { return this._currentScene; }
  public set currentScene(value: Scene) { this._currentScene = value; }
  private _currentScene: Scene = null;

  
  constructor()
  {
    this.scenes = {
      START: new StartScene(),
      PLAY: new PlayScene()
    }
  }


  public switch(sceneKey: string): void
  {
    if (this._currentScene !== null) {
      this._currentScene.exit();
    }

    this._currentScene = this.scenes[sceneKey];
    this._currentScene.enter();

  }
}


export { SceneManager };