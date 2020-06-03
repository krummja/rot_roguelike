import { EventEmitter } from 'events';
import { Positionable, Renderable } from '../../typings';
import { Component, Engine, Family, FamilyBuilder, System } from './';
import { ActorComponent, PositionComponent, RenderComponent } from './Components';
import { ComponentClass } from './Component';


export class ActorSystem extends System
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
    this.family = new FamilyBuilder(engine).include(ActorComponent).build();

    for (let entity of this.family.entities) {
      if (entity.hasComponent(ActorComponent)) {
        engine.CORE.SCHEDULER.add(entity, true);
      }
    }
  }

  public onDetach() 
  {

  }

  public update(engine: Engine, delta?: number)
  {
    for (let entity of this.family.entities) {
      if (entity.hasComponent(ActorComponent)) {
        const position = entity.getComponent(ActorComponent);
        // Do some position work here.
        // position.x = ...
        // position.y = ...
      } else {
        const position = entity.putComponent(ActorComponent);
      }
    }
  }
}