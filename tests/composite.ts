import apply = Reflect.apply;

class Entity {
  public do(v: string): void { console.log(`Entity says: ${v}`); }
}

class Character {
  public name: string = null;
}

class Mob {
  public treasure: string = "geh" || null;

  public shout() {
    console.log("Aahhhhh!");
  }
}

// Interesting...
interface Entity extends Character, Mob {}

function applyMixins(derivedCtor: any, baseCtors: any[]): void
{
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(
          derivedCtor.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });
}

applyMixins(Entity, [Character, Mob]);

let goblin = new Entity();
goblin.do("Geh, treasure.")
goblin.shout();
console.log(goblin);