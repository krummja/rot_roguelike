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
        this.family = new _1.FamilyBuilder(engine).include(Components_1.RenderComponent).build();
    }
    onDetach() {
    }
    update() {
    }
}
exports.RenderSystem = RenderSystem;
