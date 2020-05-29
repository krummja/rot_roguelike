import { Property, PropertyFormula } from './Property';
import { KeyProp } from './typings';


/**
 * Container for a list of properties.
 */
class Properties extends Map
{
  public add(property: Property): void
  {
    if (!(property instanceof Property)) {
      throw new TypeError(`${property} not a Property!`);
    }

    this.set(property.name, property);
  }

  public getProperties()
  {
    return this.entries();
  }

  public clearDeltas(): void
  {
    for (let [_, prop] of this) {
      prop.setDelta(0)
    }
  }

  public serialize()
  {
    let data: { [p: string]: any } = {};
    [...this].forEach(([key, property]: KeyProp) => {
      data[name] = property.serialize();
    });

    return data;
  }
}


export { Properties };