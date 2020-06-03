import { EventEmitter } from 'events';
import { Positionable, Renderable } from '../../typings';
import { Component, Engine, Family, FamilyBuilder, System } from './';
import { PositionComponent, RenderComponent } from './Components';


export class RenderSystem extends System
{
  public family?: Family;
  private _EVENTS: EventEmitter;

  constructor() 
  {
    super();
  }


  public onAttach(engine: Engine)
  {
    super.onAttach(engine);
    this._EVENTS = engine.CORE.EVENTS;
    this.family = new FamilyBuilder(engine).include(RenderComponent).build();
  }

  public onDetach() 
  {

  }

  public update(engine: Engine, delta?: number)
  {

  }
}