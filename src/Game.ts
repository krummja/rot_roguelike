import * as ROT from 'rot-js';
import * as System from './System';
import * as Display from './Display';
import * as ECS from './ECS';
import Scheduler from 'rot-js/lib/scheduler/scheduler';

import { EventEmitter } from 'events';



class Game
{
  public INPUT: System.Input;
  public CONSOLE: Display.Console;
  public ECS_ENGINE: ECS.Engine;
  
  public static EVENTS: EventEmitter = new EventEmitter();
  public static SCHEDULER: Scheduler = new ROT.Scheduler.Simple();
  public static ROT_ENGINE: ROT.Engine = new ROT.Engine(Game.SCHEDULER);
  
  private _SCENE_MGR: Display.SceneManager;
  private _PHYSICS_SYS: ECS.System;
  private _RENDER_SYS: ECS.System;


  constructor()
  {
    this.INPUT = new System.Input();
    this.CONSOLE = new Display.Console();
    this.ECS_ENGINE = new ECS.Engine();
    
    this._SCENE_MGR = new Display.SceneManager();
    this._PHYSICS_SYS = new ECS.PhysicsSystem();
    this._RENDER_SYS = new ECS.RenderSystem();
  }


  public initialize()
  {
    this.ECS_ENGINE.addSystem(this._PHYSICS_SYS);
    this.ECS_ENGINE.addSystem(this._RENDER_SYS);

    this._SCENE_MGR.switch('PLAY');
  }
}


export { Game };