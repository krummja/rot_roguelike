import { EventEmitter } from 'events';
import { Console, Renderable, Positionable } from '../../typings';
import { SceneManager } from '../';
import { IScene } from './';
import { PositionComponent, RenderComponent, ActorComponent } from '../ECS/Components';


export class StartScene implements IScene
{
  public sceneKey: string;
  public mapWidth: number = 200;
  public mapHeight: number = 200;
  
  private _manager: SceneManager;
  private _events: EventEmitter;
  private _console: Console;


  constructor(manager: SceneManager)
  {
    this.sceneKey = 'START';

    this._manager = manager;
    this._events = this._manager.CORE.EVENTS;
    this._console = this._manager.CORE.CONSOLE;
  }


  public enter(): void
  {
    console.log("Start Scene entered.");
  }

  public exit(): void
  {
    console.log(" Exiting Start Scene.");
  }

  public render(): void
  {
    this._console.display.drawText(1, 1, "%c{yellow}TypeScript Roguelike");
    this._console.display.drawText(1, 2, "Press [Enter] to start!");
  }
}


export class PlayScene implements IScene
{
  public sceneKey: string;

  private _manager: SceneManager
  private _events: EventEmitter;
  private _console: Console;

  constructor(manager: SceneManager)
  {
    this.sceneKey = 'PLAY';
    this._manager = manager;
    this._events = this._manager.CORE.EVENTS;
    this._console = this._manager.CORE.CONSOLE;
  }

  
  public enter(): void
  {
    console.log("Starting ROT Engine");
    this._manager.CORE.ROT_ENGINE.start();
    console.log("Adding Player to ECS Engine.");
    this._manager.CORE.ECS_ENGINE.newEntity("Player");
    
    let entities = this._manager.CORE.ECS_ENGINE.entities;
    for (let entity of entities) {
      entity.putComponent(ActorComponent);
      entity.putComponent(PositionComponent);
      entity.putComponent(RenderComponent);
      console.log(entity);
    }

    console.log("Saturating entities.");
    this._manager.CORE.ECS_ENGINE.update();

    console.log(this._manager.CORE.ECS_ENGINE);
  }

  public exit(): void
  {

  }

  public render(): void
  {
    let screenWidth = this._console.width;
    let screenHeight = this._console.height;

    

    // // Figure out the viewport dimensions
    // let topLeftX = Math.max(0, this._player.x - (screenWidth / 2));
    // topLeftX = Math.min(topLeftX, this.map.width - screenWidth);
    // let topLeftY = Math.max(0, this._player.y - (screenHeight / 2));
    // topLeftY = Math.min(topLeftY, this.map.height - screenHeight);
  }
}