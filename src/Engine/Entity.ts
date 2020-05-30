import { Component, ComponentClass } from './Component';

type EntityChangeListener = (entity: Entity) => any;


class Entity
{
  private _id: string | number | null = null;
  private readonly _components: { [tag: string]: Component } = {};
  private readonly _listeners: EntityChangeListener[] = [];
  private readonly _componentClasses: { [tag: string]: ComponentClass<Component>; } = {};

  public get id(): string | number
  {
    if (this._id === null) {
      throw new Error("Cannot retrieve a null ID.");
    }
    return this._id;
  }

  public set id(value: string | number)
  {
    if (value === null || value === undefined) {
      throw new Error("Must set a non-null value when setting an entity ID.");
    }
    if (this._id !== null) {
      throw new Error(`Entity already has ID: ${this._id}`);
    }
    this._id = value;
  }

  constructor()
  {
    this._id = (+new Date()).toString(16) + '-' + (Math.random() * 1e17).toString(16);
  }

  public isNew(): boolean
  {
    return this._id === null;
  }

  public listComponents()
  {
    return Object.keys(this._components).map(i => this._components[i]);
  }

  public listComponentsWithTypes()
  {
    return Object.keys(this._components).map(i => ({
      component: this._components[i],
      type: this._componentClasses[i]
    }));
  }

  public listComponentsWithTags()
  {
    return Object.keys(this._components).map(tag =>
        Object.freeze({
          tag, component: this._components[tag]
        })
    );
  }

  public hasComponent<T extends Component>(componentClass: ComponentClass<T>): boolean
  {
    const tag = componentClass.tag || componentClass.name;
    const component = this._components[tag];
    if (!component) return false;
    if (!this.cast(component, componentClass)) {
      throw Error(
          `There are multiple classes with the same tag or name "${tag}".\nAdd a different property "tag" to one of them.`
      );
    }
    return true;
  }

  public getComponent<T extends Component>(componentClass: ComponentClass<T>): T
  {
    const tag = componentClass.tag || componentClass.name;
    const component = this._components[tag];
    if (!component) {
      throw new Error(`Cannot get component "${tag}" from entity.`);
    }
    if (!this.cast(component, componentClass)) {
      throw new Error(
          `There are multiple classes with the same tag or name "${tag}".\nAdd a different property "tag" to one of them.`
      )
    }
    return component;
  }

  // Creates a component of the specified class and adds it to the entity.
  public putComponent<T extends Component>(componentClass: ComponentClass<T>): T
  {
    const tag = componentClass.tag || componentClass.name;
    const component = this._components[tag];
    if (component) {
      if (!this.cast(component, componentClass)) {
        throw new Error(
            `There are multiple classes with the same tag or name "${tag}".\nAdd a different property "tag" to one of them.`
        );
      }
      delete this._components[tag];
      delete this._componentClasses[tag];
    }
    const newComponent = new componentClass();
    this._components[tag] = newComponent;
    this._componentClasses[tag] = componentClass;
    for (let listener of this._listeners) {
      listener(this);
    }
    return newComponent;
  }

  public removeComponent<T extends Component>(componentClass: ComponentClass<T>)
  {
    const tag = componentClass.tag ||componentClass.name;
    const component = this._components[tag];
    if (!component) {
      throw new Error(`Component of tag "${tag}" does not exist.`);
    }
    if (!this.cast(component, componentClass)) {
      throw new Error(
          `There are multiple classes with the same tag or name "${tag}".\nAdd a different property "tag" to one of them.`
      );
    }
    delete this._components[tag];
    for (let listener of this._listeners) {
      listener(this);
    }
  }

  // Checks if the component is an instance of the class.
  public cast<T extends Component>(
      component: Component | undefined | null,
      componentClass: ComponentClass<T>): component is T
  {
    return !!(component && component instanceof componentClass);
  }

  public addListener(listener: EntityChangeListener)
  {
    const index = this._listeners.indexOf(listener);
    if (index === -1) {
      this._listeners.push(listener);
    }
    return this;
  }

  public removeListener(listener: EntityChangeListener)
  {
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
    return this;
  }
}


export { Entity, EntityChangeListener };