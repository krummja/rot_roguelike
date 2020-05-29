import { IPosition } from './typings';


class Position implements IPosition
{
  x: number = null;
  y: number = null;
  z: number = null;

  constructor(x: number, y: number, z: number)
  {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}


export { Position };