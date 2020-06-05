interface Lengthwise { length: number; }

// arg can be Object {... length: value, ...} or an array.
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

let test = loggingIdentity([0, 1, 2]);
console.log(test.length);

import * as Mixins from './mixins2';


let rectangle: Mixins.Rectangle = new Mixins.Rectangle(4, 3);

let display = rectangle.h;
console.log(display);