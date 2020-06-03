import { EventEmitter } from 'events';
import { Positionable, Renderable } from '../../typings';
import { Component, Entity, Engine, Family, FamilyBuilder, System } from './';
import { PositionComponent, RenderComponent } from './Components';
import { ComponentClass } from './Component';


export class PositionSystem extends System
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
    this.family = new FamilyBuilder(engine).include(PositionComponent).build();
  }

  public onDetach() 
  {

  }

  public update(engine: Engine, delta?: number)
  {
    for (let entity of this.family.entities) {
      if (entity.hasComponent(PositionComponent)) { 
        const position = entity.getComponent(PositionComponent);
        // 

      } else {
        const position = entity.putComponent(PositionComponent);
      }
    }
  }

  public move(x: number, y: number, dX: number, dY: number)
  {
    let newX = x + dX;
    let newY = y + dY;

  }
 }