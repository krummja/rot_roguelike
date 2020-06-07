"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Display_1 = require("../Display");
class Entity extends Display_1.Glyph {
    constructor(properties, game, map) {
        super(properties);
        this.properties = properties;
        this._name = properties['name'] || ' ';
        this._x = properties['x'] || 0;
        this._y = properties['y'] || 0;
        this._z = properties['z'] || 0;
        this.game = game || null;
        this.map = map || null;
    }
    get name() { return this._name; }
    set name(v) { this._name = v; }
    get x() { return this._x; }
    set x(v) { this._x = v; }
    get y() { return this._y; }
    set y(v) { this._y = v; }
    get z() { return this._z; }
    set z(v) { this._z = v; }
}
exports.Entity = Entity;
