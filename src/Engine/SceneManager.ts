import { Console } from '../Display/Console';
import * as Scenes from './Scenes';



export class SceneManager
{
  public scenes: { [key: string]: Scenes.Scene };
  
  public get console(): Console { return this._CONSOLE; }
  private _CONSOLE: Console;

  public get currentScene(): Scenes.Scene { return this._currentScene; }
  public set currentScene(value: Scenes.Scene) { this._currentScene = value; }
  private _currentScene: Scenes.Scene = null;


  constructor(console: Console)
  {
    this._CONSOLE = console;

    this.scenes = {
      START: new Scenes.StartScene(this),
      PLAY: new Scenes.PlayScene(this)
    }
  }


  public refresh(): void
  {
    this.console.display.clear();
    this._currentScene.render()
  }

  public switch(sceneKey: string): void
  {
    if (this._currentScene !== null) {
      this._currentScene.exit();
    }

    this._currentScene = this.scenes[sceneKey];
    this._currentScene.enter();
    this.refresh();
  }
}