import { Console } from './console';

class Renderer
{
  private _console: Console;
  private _currentScreen: Screen;

  constructor(console: Console)
  {
    this._console = console;
  }

  public render(): void
  {
    
  }
}


export { Renderer };