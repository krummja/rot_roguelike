

// Remember that the point of this is to create a property factory that can product properties and attach them to
// various sorts of game entities. For example, have the game create a TILE class, and for that class attach a certain
// mixture of properties.
// Some of those properties will have function callbacks that can be triggered.
// Such "Computed Properties" have behaviors that apply to their own internal data.

/**
 * Base Property class1
 *
 * e.g.
 *    position = {
 *      name: 'position',
 *      data: {
 *        x: 0,
 *        y: 0,
 *        z: 0
 *      }
 *    }
 */

interface Predicate {
  key: string;
  data: any;
}

// can I define this computationally?
type PropertyKeys = 'name' | 'type' | 'value' | 'formula';

/**
 *  {
 *    name: 'position',
 *    type: 'world',
 *    value: {
 *      x: 0, y: 0, z: 0
 *    },
 *    formula: {
 *      ...
 *    }
 *  }
 */

class Property
{
  private _properties: Record<PropertyKeys, Predicate> = {
       name: { key: 'name', data: null },
       type: { key: 'type', data: null },
      value: { key: 'value', data: null },
    formula: { key: 'formula', data: null }
  }

  public get properties(): Record<PropertyKeys, Predicate> { return this._properties; }
  public set properties(value: Record<PropertyKeys, Predicate>) { this._properties = value };


  // serialize() {
  //   const { type, value } = this;
  //   return { type, value };
  // }
}



let property3 = new Property();
console.log(property3);



class PropertyFormula
{
  public metadata: { [p: string]: any };
  public requires: string[];
  public formula: Function;

  constructor(metadata: { [p: string]: any }, requires: string[], fn: Function)
  {
    if (!Array.isArray(requires)) {
      throw new TypeError('Not an array!');
    }

    if (!typeof Function) {
      throw new TypeError('Not a function!');
    }

    this.metadata = metadata;
    this.requires = requires;
    this.formula = fn;
  }

  evaluate(property: Property, ...args: any): void
  {
    return this.formula.bind(property)(...args);
  }
}






//
// class Properties
// {
//   private readonly _properties: Map<string, any>;
//
//   get properties(): Map<string, any> { return this._properties; }
//
//   constructor()
//   {
//     this._properties = new Map();
//   }
//
//   add(property: Property): void
//   {
//     if (!(property instanceof Property)) {
//       throw new TypeError(`${property} is not a Property!`);
//     }
//     this._properties.set(property.name, property);
//   }
//
//   getProperties(): IterableIterator<[any,any]>
//   {
//     return this._properties.entries();
//   }
//
//   clearValues(): void
//   {
//     for (let [_, prop] of this._properties) {
//       prop = null;
//     }
//   }
//
//   serialize()
//   {
//     let data: { [p: string]: any } = {};
//     [...this._properties].forEach(([name, property]): void => { data[name] = property.serialize(); });
//     return data;
//   }
// }
//
//
// let property1 = new Property(
//     'test',
//     'world',
//     'This is a world property!',
//     {}
// );
//
//
//
//
// let property2: Property = new Property(
//     'dig',
//     'skill',
//     1,
//     {
//       metadata: {
//         skillModifiers: {
//           fighter: 2,
//           herbalist: 1,
//           miner: 3,
//           _default: 0
//         }
//       },
//       requires: ['strength'],
//       fn: function(character: any, skill: number, strength: number): number {
//         const characterClass = character.getMeta('class') || '_default';
//         let modifier = this.metadata.skillModifiers[characterClass];
//         return skill + (strength * modifier);
//       }
//     }
//   );
//
// let player = {
//   metadata: {
//     class: 'miner'
//   },
//   worldProperties: new Properties(),
//   classProperties: new Properties(),
//   skillProperties: new Properties()
// }
//
// player.worldProperties.add(property1);
// player.classProperties.add(property2);
// console.log(player.classProperties);

