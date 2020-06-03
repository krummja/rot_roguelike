import * as Display from '../../Display';
import { Component, ComponentClass } from './';


export class ActorComponent implements Component
{
  public act() {
    
  }
}


export class PositionComponent implements Component
{
  x: number = 0;
  y: number = 0;
}

// How do I generate a component that allows me to supply it values
// directly, e.g. in setting up a player with relevant renderables?

// I could define a part of the System that inspects the tag of a particular
// family of components and draws on a set of values based on that tag.
export class RenderComponent implements Component
{
  public render(console: Display.Console)
  {

  }
}

