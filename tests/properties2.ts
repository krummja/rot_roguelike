

interface IProperties
{
  glyph?: string;
  foreground?: string;
  background?: string;
}

class Entity1
{
  glyph: string;
  foreground: string;
  background: string;

  constructor(properties: IProperties)
  {
    this.glyph = properties['glyph'];
    this.foreground = properties['foreground'];
    this.background = properties['background'];
  }
}


let player = new Entity1({
  glyph: '@',
  foreground: 'goldenrod',
  background: 'black'
})


