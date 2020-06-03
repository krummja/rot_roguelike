import { Engine } from './Engine';


abstract class System
{
  public get priority(): number { return this._priority; }
  public set priority(value: number) { this._priority = value; }
  private _priority: number = 0;

  public get engines(): Engine[] { return this._engines; }
  public set engines(value: Engine[]) { this._engines = value; }
  private _engines: Engine[] = [];

  protected constructor()
  {
    this._priority = 0;
    this._engines = [];
  }

  public onAttach(engine: Engine): void
  {
    const index = this._engines.indexOf(engine);
    if (index === -1) {
      this._engines.push(engine);
    }
  }

  public onDetach(engine: Engine): void
  {
    const index = this._engines.indexOf(engine);
    if (index !== -1) {
      this._engines.splice(index, 1);
    }
  }

  abstract update(engine: Engine, delta?: number): void;
}


export { System };