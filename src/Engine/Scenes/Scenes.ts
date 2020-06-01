import { SceneManager } from '../';
import { IScene } from './';


export class StartScene implements IScene
{
  public mapWidth: number = 200;
  public mapHeight: number = 200;

  private _manager: SceneManager

  constructor(manager: SceneManager)
  {
    this._manager = manager;
  }

  public enter(): void
  {
    console.log("Start Scene entered.");
  }

  public exit(): void
  {
    console.log(" Exiting Start Scene.")
  }

  public render(): void
  {
    let console = this._manager.console;
    console.display.drawText(1, 1, "%c{yellow}TypeScript Roguelike");
    console.display.drawText(1, 2, "Press [Enter] to start!");
  }
}


export class PlayScene implements IScene
{
  private _manager: SceneManager

  constructor(manager: SceneManager)
  {
    this._manager = manager;
  }

  public enter(): void
  {
    
  }

  public exit(): void
  {

  }

  public render(): void
  {
    let console = this._manager.console;

  }
}