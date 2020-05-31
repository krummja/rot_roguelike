"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderSystem = void 0;
const _1 = require("./");
/**
 * RenderSystem handles the processing of all renderables on game Entities.
 *
 * From System, inherits:
 *   onAttach(engine)
 *   onDetach(engine)
 *   update(engine, delta?)
 */
class RenderSystem extends _1.System {
    constructor() {
        super();
    }
    update(engine) {
        console.log("Update fired from within the Render system!");
    }
}
exports.RenderSystem = RenderSystem;
