import EventEmitter from 'events';
import { Property } from '../src/Property';
import { KeyProp } from '../src/typings';


interface Lengthwise { length: number; }

// arg can be Object {... length: value, ...} or an array.
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

let test = loggingIdentity([0, 1, 2]);
console.log(test.length);


interface IBehaviorComponent {
  act(): void;
}

interface IAttributeComponent {
  strength: number;
  intelligence: number;
  wisdom: number;
}

class BehaviorComponent implements IBehaviorComponent
{
  private _owner: any;
  public name: string= "BehaviorComponent";
  public act(): void
  {
    console.log("This is an 'act' method inside a 'Behavior' component!");
  }

  constructor(owner: any) {
    this._owner = owner;
  }
}


class ClassComponent implements IAttributeComponent
{
  private _owner: any;
  public name: string = "ClassComponent";
  public strength: number = 0;
  public intelligence: number = 0;
  public wisdom: number = 0;

  constructor(owner: any) {
    this._owner = owner;
  }
}

class ActorDecorator implements IBehaviorComponent
{
  protected component: IBehaviorComponent;
  constructor(component: IBehaviorComponent) {
    this.component = component;
  }

  public act(): void {
    this.component.act();
  }
}

class WizardDecorator implements IAttributeComponent
{
  public strength: number = 4;
  public intelligence: number = 10;
  public wisdom: number = 6;
}

class Entity
{
  components: Array<any> = [];
  props: Map<any, any> = new Map();

  // Provide an array of component symbols
  constructor(componentArray: any[]) {
    for (let i = 0; i < componentArray.length; i++) {
      this.components.push(new componentArray[i](this));
      // try doing this but with a Map?
    }
  }
}

let Player = new Entity([BehaviorComponent, ClassComponent]);
console.log(Player.components[0].act());

const Scriptable = (parentClass: any) =>
    class extends parentClass
    {
      emit(name: string, ...args: any) {}
    }

interface Stringmap { [key: string]: any; }
const Metadatable = (parentClass: any) =>
    class extends parentClass
    {
      public metadata: Stringmap = {}
      private _metadata: Stringmap = {}

      setMeta(data: Stringmap): void {
        this.metadata = {
          ...data, ...this._metadata
        }
      }

      getMeta(arg: any) {
        return this.metadata[arg];
      }
    }

class GameEntity extends Scriptable(Metadatable(EventEmitter)) {
  class: string;

  constructor() {
    super();
    this.class = 'warrior';
  }
}

let player = new GameEntity();

let testAttributes: { [p: string]: any } =
  {
    name: 'attack_power',
    base: 10,
    metadata: {
      classModifiers: {
        warrior: 2,
        rogue: 1,
        mage: 0.5,
        _default: 1
      },
    },
    formula: {
      requires: ['strength'],
      fn: function(character: any, attack_power: number, strength: number): number {
        const characterClass = character.getMeta('class') || '_default';
        const modifier: number = testAttributes.metadata.classModifiers[characterClass];
        return attack_power + (strength * modifier);
      }
    }
  }




class AttributeFormula
{
  public requires: Array<string>;
  public formula: Function;
  constructor(requires: Array<string>, fn: Function) {
    this.requires = requires;
    this.formula = fn;
  }

  evaluate(attribute: any, ...args: any[]): Function
  {
    return this.formula.bind(attribute)(...args);
  }
}




class Properties extends Map
{
  add(property: any): void
  {
    this.set(property.name, property);
  }

  getProperties()
  {
    return this.entries();
  }

  clearDeltas(): void
  {
    for (let [_, prop] of this) {
      prop.setDelta(0)
    }
  }

  serialize()
  {
    let data: { [p: string]: any };
    [...this].forEach(([key, property]: KeyProp): void => {
      data[name] = property.serialize();
    });

    return data;
  }
}




