import { Scene } from '../typings';
import * as Engine from '../Engine';
import * as Scenes from './Scenes';
import * as Generators from './Generators';


export class SceneManager
{
  public CORE: Engine.Core;
  public scenes: { [key: string]: Scene };
  
  public get currentScene(): Scene { return this._currentScene; }
  public set currentScene(value: Scene) { this._currentScene = value; }
  private _currentScene: Scene = null;


  constructor(core: Engine.Core)
  {
    this.CORE = core;

    this.scenes = {
      START: new Scenes.StartScene(this),
      PLAY: new Scenes.PlayScene(this)
    }
  }


  public handleInput()
  {
    let manager = this;

    // Return
    this.CORE.EVENTS.on('return', () => {
      if (manager.currentScene.sceneKey === 'START') {
        manager.switch('PLAY');
      } else {
        console.log("This key has no function!");
      }
    })

    // Numpad Directions

    // Other
  }

  // Clear the console and then render the current scene.
  public refresh(): void
  {
    this.CORE.CONSOLE.display.clear();
    this._currentScene.render()
  }

  // Change scenes.
  public switch(sceneKey: string): void
  {
    if (this.currentScene !== null) {
      this.currentScene.exit();
    }

    this.CORE.CONSOLE.display.clear();
    this.currentScene = this.scenes[sceneKey];

    if (this.currentScene) {
      this.currentScene.enter();
      this.refresh();
    }
  }
}