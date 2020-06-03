import { EventEmitter } from 'events';
import * as Display from '../../Display';
import { Console, Renderable, Positionable } from '../../typings';
import * as Generators from '../Generators';
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
  
  public get builder(): Generators.Builder { return this._builder; }
  private _builder: Generators.Builder;

  private _manager: SceneManager;
  private _events: EventEmitter;
  private _console: Console;
  private _currentMap: Array<Array<Display.Tile>>;

  private _height: number = 200;
  private _width: number = 200;

  constructor(manager: SceneManager)
  {
    this.sceneKey = 'PLAY';
    this._manager = manager;
    this._events = this._manager.CORE.EVENTS;
    this._console = this._manager.CORE.CONSOLE;

    this._builder = new Generators.Builder(this._width, this._height)
    let tileArray = this._builder.generateTileArray();
    this._currentMap = this._builder.generateArea(tileArray);
  }

  
  public enter(): void
  {
    console.log("Play Scene Entered.");
    console.log("");
    console.log("Starting ROT Engine");
    this._manager.CORE.ROT_ENGINE.start();
    console.log("Adding Player to ECS Engine.");
    this._manager.CORE.ECS_ENGINE.newEntity("Player", "PLAYER");
    
    // Set up components.
    console.log("Generating components.")
    let entities = this._manager.CORE.ECS_ENGINE.entities;
    for (let entity of entities) {
      entity.putComponent(ActorComponent);
      entity.putComponent(PositionComponent);
      entity.putComponent(RenderComponent);
      console.log(entity);
    }
    
    // Update all systems.
    console.log("Saturating entities.");
    this._manager.CORE.ECS_ENGINE.update();
  }

  public exit(): void
  {

  }

  public render(): void
  {
    let screenWidth = this._console.width;
    let screenHeight = this._console.height;

    // // Figure out the viewport dimensions
    let topLeftX = Math.max(0, 100 - (screenWidth / 2));
    topLeftX = Math.min(topLeftX, this._width - screenWidth);
    let topLeftY = Math.max(0, 100 - (screenHeight / 2));
    topLeftY = Math.min(topLeftY, this._height - screenHeight);

    for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
      for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
        let tile = this._builder.getTile(x, y);
        this._console.display.draw(
          x - topLeftX,
          y - topLeftY,
          tile.glyph.character,
          tile.glyph.foreground,
          tile.glyph.background
        )
      }
    }
  }
}