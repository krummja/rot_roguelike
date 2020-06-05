"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glyph = void 0;
class Glyph {
    constructor(properties) {
        this._map = null;
        this._character = properties['character'] || ' ';
        this._foreground = properties['foreground'] || [255, 255, 255];
        this._background = properties['background'] || [255, 255, 255];
        this._darkBackground = properties['darkBackground'] || [255, 255, 255];
        this._walkable = properties['walkable'] || false;
        this._diggable = properties['diggable'] || false;
        this._traversable = properties['traversable'] || { open: false, direction: undefined };
        this._opaque = (properties['opaque'] !== undefined) ? properties['opaque'] : true;
    }
    get char() { return this._character; }
    set char(v) { this._character = v; }
    get fg() { return this._foreground; }
    set fg(v) { this._foreground = v; }
    get bg() { return this._background; }
    set bg(v) { this._background = v; }
    get dbg() { return this._darkBackground; }
    set dbg(v) { this._darkBackground = v; }
    get walkable() { return this._walkable; }
    set walkable(v) { this._walkable = v; }
    get diggable() { return this._diggable; }
    set diggable(v) { this._diggable = v; }
    get traversable() { return this._traversable; }
    set traversable(v) { this._traversable = v; }
    get opaque() { return this._opaque; }
    set opaque(value) { this._opaque = value; }
    get map() { return this._map; }
    set map(value) { this._map = value; }
}
exports.Glyph = Glyph;
