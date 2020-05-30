"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicsSystem = void 0;
const _1 = require("./");
/**
 * PhysicsSystem handles movement and interaction among Physical entities.
 *
 * From System, inherits:
 *   onAttach(engine)
 *   onDetach(engine)
 *   update(engine, delta?)
 */
class PhysicsSystem extends _1.System {
    constructor() {
        super();
    }
    update(engine) {
    }
}
exports.PhysicsSystem = PhysicsSystem;
