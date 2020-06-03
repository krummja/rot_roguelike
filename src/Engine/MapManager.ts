import * as Display from '../Display';
import { Builder } from './Generators';
import { Core } from './';

export class MapManager
{
  private _CORE: Core
  private _builder: Builder;

  constructor(core: Core)
  {
    this._CORE = core;
    this._builder = new Builder(200, 200);
  }

  public setupArea()
  {
    let tileArray: Array<Array<Display.Tile>> = this._builder.generateTileArray();
    let mapArray = this._builder.generateArea(tileArray);
  }
}