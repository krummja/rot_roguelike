import {Glyph} from '../Display';
import {Constructor, IProperties} from '../types';


class Entity extends Glyph
{
  private _name: string;
  private _x: number;
  private _y: number;

  public properties: IProperties;
  public attachedMixins: any[];

  public get name(): string { return this._name; }
  public set name(v: string) { this._name = v; }

  public get x(): number { return this._x; }
  public set x(v: number) { this._x = v; }

  public get y(): number { return this._y; }
  public set y(v: number) { this._y = v; }


  constructor(properties: IProperties)
  {
    super(properties);

    // These are props not in Glyph that we're adding.
    this._name = properties['name'] || ' ';
    this._x = properties['x'] || 0;
    this._y = properties['y'] || 0;
  }
}


function HitCounter<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    name: string;
    multiplier: number;
    hits: number;
    incrementHit: Function;
    getHitCount: Function;

    constructor(...args: any[]) {
      super(...args);
      this.name = "HitCounter";
      this.multiplier = 1;
      this.hits = 0;
      this.incrementHit = (): void => { this.hits += this.multiplier; }
      this.getHitCount = (): number => { return this.hits; }
    }
  }
}

function TestMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    newProp: string;

    constructor(...args: any[]) {
      super(...args);
      this.newProp = 'test property'
    }
  }
}


function newEntity(target: typeof Entity, mixins: any[], config: IProperties): Entity
{
  let targetArray = [];
  targetArray.push(target);
  let mixinArray = mixins;

  while (mixinArray.length > 0) {
    // Get the next mixin, if there is one.
    let mixin = mixinArray.pop();
    // Get the target object we're working on.
    let target: typeof Entity = targetArray.pop();
    // Apply the mixin to the working target.

    let composite = mixin(target);
    // Push the composite back into the targetArray.
    targetArray.push(composite);
  }

  let FinalComposite: typeof Entity = targetArray.pop();
  let bareComposite = new FinalComposite(config);

  if (config['name']) {
    bareComposite.name = config['name'];
    return bareComposite;
  } else {
    return bareComposite;
  }
}

let test = newEntity(Entity, [HitCounter, TestMixin], {
  character: '#',
  name: 'Test Object',
  x: 0,
  y: 0
});

test.incrementHit();

let TestClass = TestMixin(HitCounter(Entity));
let test2 = new TestClass({
  character: '#',
  x: 10,
  y: 10
})

test2.incrementHit();


export { Entity };