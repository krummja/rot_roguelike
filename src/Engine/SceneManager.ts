import { Scene } from '../typings';
import * as Engine from '../Engine';
import * as Scenes from './Scenes';


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


  /**
   * Handles input based on currently active scene.
   */
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

  /**
   * Refresh the console and trigger a console update.
   */
  public refresh(): void
  {
    this.CORE.CONSOLE.display.clear();
    this._currentScene.render()
  }

  /**
   * Handles switching of scenes.
   * @param sceneKey 
   */
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