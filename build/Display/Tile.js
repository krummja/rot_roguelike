"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const Glyph_1 = require("./Glyph");
class Tile {
    constructor(properties, glyphProps) {
        // Mutables: Physics and Position
        this._walkable = properties['walkable'];
        this._diggable = properties['diggable'];
        this._opaque = properties['opaque'];
        this._x = properties['x'];
        this._y = properties['y'];
        // Immutables: Renderables
        this._glyphProps = glyphProps;
        this._glyph = new Glyph_1.Glyph(this._glyphProps);
    }
}
exports.Tile = Tile;
