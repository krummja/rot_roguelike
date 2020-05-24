import { Glyph } from '../Display';
import { IProperties } from '../types';





class Entity extends Glyph
{
  private _name: string;
  private _x: number;
  private _y: number;
  private _attachedMixins: {};

  public mixins: any[] = [];


  public get name(): string { return this._name; }
  public set name(v: string) { this._name = v; }

  public get x(): number { return this._x; }
  public set x(v: number) { this._x = v; }

  public get y(): number { return this._y; }
  public set y(v: number) { this._y = v; }

  public get attachedMixins(): {} { return this._attachedMixins; }
  public set attachedMixins(v: {}) { this._attachedMixins = v; }


  constructor(properties: IProperties)
  {
    super(properties);

    // These are props not in Glyph that we're adding.
    this._name = properties['name'] || ' ';
    this._x = properties['x'] || 0;
    this._y = properties['y'] || 0;

    // Functions we could add to an Entity;
    this.mixins = properties['mixins'] || [];
    for (let mixin of this.mixins) {
      mixin(this);
    }
  }
}


// if I put the symbol for a function in mixins: [], I want the Entity class to be able
// to instantiate the properties relevant to it.

// https://mariusschulz.com/blog/mixin-classes-in-typescript
type Constructor<T = {}> = new (...args: any[]) => T;
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  }
}

class User {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const TimestampedUser = Timestamped(User);
const user = new TimestampedUser("John Doe");

function Tagged<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    tag: string | null;
    constructor(...args: any[]) {
      super(...args);
      this.tag = null;
    }
  }
}

const SpecialUser = Tagged(Timestamped(User));
const user2 = new SpecialUser("Mary Doe");

function HitCounter<TBase extends Constructor>(Base: TBase)
{
  return class extends Base
  {
    public name: string = 'HitCounter';
    public multiplier: number;
    public hits: number;

    constructor(...args: any[])
    {
      super(...args);

      this.multiplier = 1;
      this.hits = 0;
    }

    public incrementHit(): void
    {
      this.hits += this.multiplier;
    }

    public getHitCount(): number
    {
      return this.hits;
    }
  }
}

let e = new Entity({
  name: 'Test Entity',
  x: 0, y: 0,
  mixins: [HitCounter]
})


console.log(e);


export { Entity };