import { IPropertyFormula } from './typings';


/**
 *  Example attributes from Ranvier Core
 *
 *  [
 *    {
 *      name: 'health', base: 100,
 *      formula: {
 *        requires: [],
 *        fn: function (character, health) {
 *          return health + (character.level ** 2);
 *        }
 *      }
 *    },
 *    {
 *      name: 'energy', base: 100
 *    }
 *  ]
 */


/**
 * @property {string} name    Simple name of the property.
 * @property {number} base    The baseline value of the property.
 */
class Property
{
  public name: string;
  public base: number;
  public delta: number;
  public formula: PropertyFormula;
  public metadata: {};

  constructor(name: string, base: number, delta: number, formula: PropertyFormula = null, metadata: {} = {})
  {
    if (isNaN(base)) {
      throw new TypeError(`Base property must be a number, got ${base}.`);
    }

    if (isNaN(delta)) {
      throw new TypeError(`Property delta must be a number, got ${delta}.`);
    }

    if (formula && !(formula instanceof PropertyFormula)) {
      throw new TypeError('Property formula must be instance of PropertyFormula.');
    }

    this.name = name;
    this.base = base;
    this.delta = delta;
    this.formula = formula;
    this.metadata = metadata;
  }

  public lower(amount: number): void
  {
    this.raise(-amount);
  }

  public raise(amount: number): void
  {
    this.delta = Math.min(this.delta + amount, 0);
  }

  public setBase(amount: number): void
  {
    this.base = Math.max(amount, 0);
  }

  public setDelta(amount: number): void
  {
    this.delta = Math.min(amount, 0);
  }

  public serialize()
  {
    const { delta, base } = this;
    return { delta, base };
  }
}


class PropertyFormula implements IPropertyFormula
{
  public requires: [];
  public fn: Function;

  constructor(requires: [], fn: Function)
  {
    this.requires = [];
    this.fn = fn;
  }
}


export { Property, PropertyFormula };