import * as ROT from 'rot-js';
import { IProperties } from '../typings';


class Glyph
{
  public character: string;
  public foreground: string;
  public background: string;

  constructor(properties: IProperties)
  {
    this.character    = properties['character']   || ' ';
    this.foreground   = properties['foreground']  || 'white';
    this.background   = properties['background']  || 'black';
  }
}


export { Glyph };