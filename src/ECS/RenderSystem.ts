import { Engine, System } from './';


/**
 * RenderSystem handles the processing of all renderables on game Entities.
 * 
 * From System, inherits:
 *   onAttach(engine)
 *   onDetach(engine)
 *   update(engine, delta?)
 */
class RenderSystem extends System
{

  constructor()
  {
    super();
  }

  public update(engine: Engine): void
  {
    console.log("Update fired from within the Render system!");
  }
}


export { RenderSystem };