"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderSystem = void 0;
const _1 = require("./");
const Components_1 = require("./Components");
class RenderSystem extends _1.System {
    constructor() {
        super();
    }
    onAttach(engine) {
        super.onAttach(engine);
        this._EVENTS = engine.CORE.EVENTS;
        this.family = new _1.FamilyBuilder(engine).include(Components_1.RenderComponent).build();
    }
    onDetach() {
    }
    update(engine, delta) {
        for (let entity of this.family.entities) {
            if (entity.hasComponent(Components_1.RenderComponent)) {
                const renderable = entity.getComponent(Components_1.RenderComponent);
            }
            else {
                const renderable = entity.putComponent(Components_1.RenderComponent);
            }
        }
    }
}
exports.RenderSystem = RenderSystem;
