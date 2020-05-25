import { IProperties } from '../types';

import { Glyph } from './';


class Tile extends Glyph
{


  constructor(properties: IProperties)
  {
    super(properties)
  }


  public static nullTile(): Tile
  {
    return new Tile({});
  }

  public static floorTile(): Tile
  {
    let colors = ['#29231c', '#332d25', '#25211d', '#292018']

    return new Tile({
      character: ' ',
      background: pickColor(colors),
      isWalkable: true
    });
  }

  public static wallTile(): Tile
  {
    let colors = ['#9a7e61', '#a78a6d', '#a08467', '#ad9173'];

    return new Tile({
      character: ' ',
      background: pickColor(colors),
      isDiggable: true
    });
  }
}

const pickColor: Function = (colors: string[]): string => {
  let index = Math.floor(random(0, 4));
  return colors[index];
};


const random: Function = (mn: number, mx: number): number => {
  return Math.random() * (mx - mn) + mn;
}

export { Tile };
