"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glyph = void 0;
var Glyph = /** @class */ (function () {
    function Glyph(properties) {
        this._char = properties['character'] || ' ';
        this._fg = properties['foreground'] || 'white';
        this._bg = properties['background'] || 'black';
        this._walkable = properties['isWalkable'] || false;
        this._diggable = properties['isDiggable'] || false;
    }
    Object.defineProperty(Glyph.prototype, "char", {
        get: function () { return this._char; },
        set: function (v) { this._char = v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Glyph.prototype, "fg", {
        get: function () { return this._fg; },
        set: function (v) { this._fg = v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Glyph.prototype, "bg", {
        get: function () { return this._bg; },
        set: function (v) { this._bg = v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Glyph.prototype, "walkable", {
        get: function () { return this._walkable; },
        set: function (v) { this._walkable = v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Glyph.prototype, "diggable", {
        get: function () { return this._diggable; },
        set: function (v) { this._diggable = v; },
        enumerable: false,
        configurable: true
    });
    return Glyph;
}());
exports.Glyph = Glyph;
