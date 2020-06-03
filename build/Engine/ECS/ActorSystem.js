"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorSystem = void 0;
const _1 = require("./");
const Components_1 = require("./Components");
class ActorSystem extends _1.System {
    constructor() {
        super();
    }
    onAttach(engine) {
        super.onAttach(engine);
        this._EVENTS = engine.CORE.EVENTS;
        this.family = new _1.FamilyBuilder(engine).include(Components_1.ActorComponent).build();
        for (let entity of this.family.entities) {
            if (entity.hasComponent(Components_1.ActorComponent)) {
                engine.CORE.SCHEDULER.add(entity, true);
            }
        }
    }
    onDetach() {
    }
    update(engine, delta) {
        for (let entity of this.family.entities) {
            if (entity.hasComponent(Components_1.ActorComponent)) {
                const position = entity.getComponent(Components_1.ActorComponent);
                // Do some position work here.
                // position.x = ...
                // position.y = ...
            }
            else {
                const position = entity.putComponent(Components_1.ActorComponent);
            }
        }
    }
}
exports.ActorSystem = ActorSystem;
