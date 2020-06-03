"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderComponent = exports.PositionComponent = exports.ActorComponent = void 0;
class ActorComponent {
    act() {
    }
}
exports.ActorComponent = ActorComponent;
class PositionComponent {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
exports.PositionComponent = PositionComponent;
// How do I generate a component that allows me to supply it values
// directly, e.g. in setting up a player with relevant renderables?
// I could define a part of the System that inspects the tag of a particular
// family of components and draws on a set of values based on that tag.
class RenderComponent {
    constructor() {
        this.renderable = {
            char: '@',
            fg: '',
            bg: ''
        };
    }
    render(console) {
    }
}
exports.RenderComponent = RenderComponent;
