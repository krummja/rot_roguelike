import { IProperties } from '../types';
import { Glyph } from './Glyph';

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
    let colors = [
      [41, 35, 28], 
      [51, 45, 37], 
      [37, 33, 29], 
      [41, 32, 24]
    ]
    
    return new Tile({
      character: ' ',
      background: this.pickColor(colors),
      walkable: true,
      traversable: {
        open: false,
        direction: undefined
      },
      opaque: false,
    });
  }

  public static wallTile(): Tile
  {
    let colors = [
      [154, 126, 97], 
      [167, 138, 109], 
      [160, 132, 103], 
      [173, 145, 115]
    ]

    return new Tile({
      character: ' ',
      background: this.pickColor(colors),
      diggable: true,
      traversable: {
        open: false,
        direction: undefined
      },
      opaque: true
    });
  }

  public static stairsUpTile(): Tile
  {
    let colors = [
      [41, 35, 28], 
      [51, 45, 37], 
      [37, 33, 29], 
      [41, 32, 24]
    ]

    return new Tile({
      character: '▲',
      foreground: [255, 255, 255],
      background: this.pickColor(colors),
      walkable: true,
      traversable: {
        open: true,
        direction: 'up'
      },
      opaque: false
    })
  }

  public static stairsDownTile(): Tile
  {
    let colors = [
      [41, 35, 28], 
      [51, 45, 37], 
      [37, 33, 29], 
      [41, 32, 24]
    ]

    return new Tile({
      character: '▼',
      foreground: [200, 200, 200],
      background: this.pickColor(colors),
      walkable: true,
      traversable: {
        open: true,
        direction: 'down'
      },
      opaque: false
    })
  }

  public static pickColor: Function = (colors: Array<Array<number>>): number[] => {
    let index = Math.floor(Tile.random(0, 4));
    return colors[index];
  }

  public static random: Function = (mn: number, mx: number): number => {
    return Math.random() * (mx - mn) + mn;
  }
}


export { Tile };
export { Glyph };