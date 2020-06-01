// External Libraries
import * as ROT from 'rot-js';
import Scheduler from 'rot-js/lib/scheduler/scheduler';

// Engine-External Modules
import * as Controller from '../Controller';
import * as Display from '../Display';

// Engine-Internal Modules
import * as Scenes from './Scenes';

// Engine Components
import { SceneManager } from './SceneManager';


export class Core
{
  public get Console(): Display.Console { return this._CONSOLE; }
  private _CONSOLE: Display.Console;

  private _INPUT: Controller.Input;
  private _ROT_ENGINE: ROT.Engine;
  private _SCENE_MANAGER: SceneManager;
  private _SCHEDULER: Scheduler;


  constructor()
  {
    this._CONSOLE = new Display.Console(this);
    this._INPUT = new Controller.Input(this);

    this._SCENE_MANAGER = new SceneManager(this._CONSOLE);
    
    // ECS Engine will be called somewhere in here.

    this._SCHEDULER = new ROT.Scheduler.Simple();
    this._ROT_ENGINE = new ROT.Engine(this._SCHEDULER);
  }

  
  public initialize() {
    this._SCENE_MANAGER.switch('START');
  }
}