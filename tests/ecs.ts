
interface ComponentData { key: string; data: any; }
type ComponentKeys = 'POSITION';
type Components = Record<ComponentKeys, ComponentData> | null;


class Entity
{
  public get id(): string { return this._id; }
  private readonly _id: string;

  public get components(): Components { return this._components; }
  public set components(value: Components) { this._components = value; }
  // TODO: Figure out a way to do this dynamically.
  private _components: Components = null;

  constructor()
  {
    this._id = (+new Date()).toString(16) + '-' + (Math.random() * 1e17).toString(16);
  }
}

// https://github.com/nova-engine/ecs/tree/master/src
interface Component { }
// https://github.com/nova-engine/ecs/blob/master/src/Family.ts
interface ComponentClass<T extends Component> {
  readonly name: string;
  readonly tag?: string;
  new (): T;
}

class PositionComponent implements Component {
  x = 0; y = 0; z = 0;
}

