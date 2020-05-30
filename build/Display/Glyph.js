"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glyph = void 0;
class Glyph {
    constructor(properties) {
        this._character = properties['character'];
        // Add a disjunction that grabs a global font config if local is undefined/null.
        this._font = properties['font'];
        this._foreground = properties['foreground'];
        this._background = properties['background'];
    }
    get character() { return this._character; }
    set character(v) { this._character = v; }
    get foreground() { return this._foreground; }
    set foreground(v) { this._foreground = v; }
    get background() { return this._background; }
    set background(v) { this._background = v; }
}
exports.Glyph = Glyph;
