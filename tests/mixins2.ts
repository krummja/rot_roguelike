import * as ROT from 'rot-js';

export class Shape {
  draw(): void {
      console.log("shape is drawing");
  }
}

export class Component {
  display(): void {
      console.log("component is displaying");
  }
}

export class Color {
  test: any = new ROT.Path.Dijkstra(1, 2, ():boolean => { return true; }, {});
  color(): void {
    console.log("color is coloring");  
  }
}

export class Rectangle implements Shape, Component, Color {
  w: number;
  h: number;
  test: any;

  constructor(w: number, h: number) {
      this.w = w;
      this.h = h;
  }

  area(): number {
      return this.w * this.h;
  }

  //just provide the empty implementation which will be replaced by the mixins helper function
  //same as display: () => void
  display(): void {
  }

  //same as draw: () => void
  draw(): void {
  }

  color(): void {
  }
}

//applying mixing which iterates through properties of baseCtors classes  and copy them to the target class (derivedCtor)
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
          Object.defineProperty(derivedCtor.prototype, name,
              Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
      });
  });
}

applyMixins(Rectangle, [Shape, Component, Color]);

let rectangle: Rectangle = new Rectangle(4, 3);
rectangle.draw();
rectangle.display();
rectangle.color();
let area = rectangle.area();
console.log(area);