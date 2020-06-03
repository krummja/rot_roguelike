"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
class System {
    constructor() {
        this._priority = 0;
        this._engines = [];
        this._priority = 0;
        this._engines = [];
    }
    get priority() { return this._priority; }
    set priority(value) { this._priority = value; }
    get engines() { return this._engines; }
    set engines(value) { this._engines = value; }
    onAttach(engine) {
        const index = this._engines.indexOf(engine);
        if (index === -1) {
            this._engines.push(engine);
        }
    }
    onDetach(engine) {
        const index = this._engines.indexOf(engine);
        if (index !== -1) {
            this._engines.splice(index, 1);
        }
    }
}
exports.System = System;
