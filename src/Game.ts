import * as ROT from 'rot-js';
import * as Display from './Display/';
import * as ECS from './ECS/';

import { Input } from './Input';
import { SceneManager, Scene, PlayScene } from './Display/';


/**
 * The 'Game' class is the root class that brings together the various modules that
 * make up the game itself.
 * 
 * Each module is self-contained and coordinate information largely through an Observer.
 */
class Game
{
  public console: Display.Console;
  public sceneManager: Display.SceneManager;

  public engine: ECS.Engine;

  public input: Input;

  public get currentScene(): Scene { return this._currentScene; }
  public set currentScene(value: Scene) { this._currentScene = value; }
  private _currentScene: Scene = null;

  constructor()
  {
    // Display
    this.console      = new Display.Console();
    this.sceneManager = new Display.SceneManager(this);

    // ECS Library
    this.engine       = new ECS.Engine();

    // System
    this.input        = new Input();
  }

  public initialize()
  {
    let playScene = new PlayScene();
    this.sceneManager.switch(playScene);
  }
}


export { Game };