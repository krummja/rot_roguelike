// External Libraries
import { EventEmitter } from 'events';
import * as ROT from 'rot-js';
import Scheduler from 'rot-js/lib/scheduler/scheduler';

// Engine-External Modules
import { Console } from '../typings';
import * as Controller from '../Controller';
import * as Display from '../Display';

// Engine-Internal Modules
import * as ECS from './ECS';

// Engine Components
import { SceneManager } from './SceneManager';


export class Core
{
  public EVENTS: EventEmitter = new EventEmitter();

  public get CONSOLE(): Console { return this._CONSOLE; }
  private _CONSOLE: Console;

  public get INPUT(): Controller.Input { return this._INPUT; }
  private _INPUT: Controller.Input;

  public get ROT_ENGINE(): ROT.Engine { return this._ROT_ENGINE; }
  private _ROT_ENGINE: ROT.Engine;

  public get ECS_ENGINE(): ECS.Engine { return this._ECS_ENGINE; }
  private _ECS_ENGINE: ECS.Engine;

  public get ACTOR_SYSTEM(): ECS.ActorSystem { return this._ACTOR_SYSTEM; }
  private _ACTOR_SYSTEM: ECS.ActorSystem;

  public get POSITION_SYSTEM(): ECS.PositionSystem { return this._POSITION_SYSTEM; }
  private _POSITION_SYSTEM: ECS.PositionSystem;

  public get RENDER_SYSTEM(): ECS.RenderSystem { return this._RENDER_SYSTEM; }
  private _RENDER_SYSTEM: ECS.RenderSystem;

  public get SCHEDULER(): Scheduler { return this._SCHEDULER; }
  private _SCHEDULER: Scheduler;

  private _SCENE_MANAGER: SceneManager;
  


  constructor()
  {
    this._CONSOLE = new Display.Console(this);
    this._INPUT = new Controller.Input(this);
    this._SCENE_MANAGER = new SceneManager(this);
    
    // ECS Engine will be called somewhere in here.

    this._SCHEDULER = new ROT.Scheduler.Simple();
    this._ROT_ENGINE = new ROT.Engine(this._SCHEDULER);

    this._ECS_ENGINE = new ECS.Engine(this);
    this._ACTOR_SYSTEM = new ECS.ActorSystem();
    this._POSITION_SYSTEM = new ECS.PositionSystem();
    this._RENDER_SYSTEM = new ECS.RenderSystem();
  }


  /**
   * Get the business end pointed the right way
   */
  public initialize() {
    // Set up entities and initialize systems.
    this._INPUT.initialize();
    
    // Start up ECS Engine and Systems
    this._ECS_ENGINE.addSystem(this._ACTOR_SYSTEM);
    this._ECS_ENGINE.addSystem(this._POSITION_SYSTEM);
    this._ECS_ENGINE.addSystem(this._RENDER_SYSTEM);

    // Bootstrap the scene switcher.
    this._SCENE_MANAGER.switch('START');

    // Pass control to the manager.
    this._SCENE_MANAGER.handleInput();
  }
}