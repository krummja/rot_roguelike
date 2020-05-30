import { Component, ComponentClass } from './Component';


class POSITION implements Component
{
  position = (x: number, y: number, z: number): number[] => {
    return [x, y, z];
  }
}


export { POSITION }