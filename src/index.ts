import * as ECS from './Engine';

let Engine = new ECS.Engine();

let e1 = new ECS.Entity();
let e2 = new ECS.Entity();
let e3 = new ECS.Entity();
let position = new ECS.POSITION();



Engine.addEntities(e1, e2, e3);
console.log(Engine);