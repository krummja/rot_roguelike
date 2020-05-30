"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
/**
 * This is the main renderer for the game. It handles all of the console's display lifecycle.
 *
 */
class Renderer {
    constructor() {
    }
    get scene() { return this._scene; }
    clear() {
    }
    refresh() {
        console.log("Refresh fired!");
    }
    render(scene) {
        this._scene = scene;
    }
}
exports.Renderer = Renderer;
