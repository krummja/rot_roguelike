import { Engine, System } from './';


/**
 * PhysicsSystem handles movement and interaction among Physical entities.
 * 
 * From System, inherits:
 *   onAttach(engine)
 *   onDetach(engine)
 *   update(engine, delta?)
 */
class PhysicsSystem extends System
{

  constructor()
  {
    super();
  }

  public update(engine: Engine): void
  {
    console.log("Update fired from within the Physics system!");
  }
}


export { PhysicsSystem };