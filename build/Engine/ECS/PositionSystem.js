"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionSystem = void 0;
const _1 = require("./");
const Components_1 = require("./Components");
class PositionSystem extends _1.System {
    constructor() {
        super();
    }
    onAttach(engine) {
        super.onAttach(engine);
        this._EVENTS = engine.CORE.EVENTS;
        this.family = new _1.FamilyBuilder(engine).include(Components_1.PositionComponent).build();
    }
    onDetach() {
    }
    update(engine, delta) {
        for (let entity of this.family.entities) {
            if (entity.hasComponent(Components_1.PositionComponent)) {
                const position = entity.getComponent(Components_1.PositionComponent);
                // 
            }
            else {
                const position = entity.putComponent(Components_1.PositionComponent);
            }
        }
    }
    move(x, y, dX, dY) {
        let newX = x + dX;
        let newY = y + dY;
    }
}
exports.PositionSystem = PositionSystem;
