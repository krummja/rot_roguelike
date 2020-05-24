"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glyph = void 0;
var Glyph = /** @class */ (function () {
    function Glyph(char, fg, bg) {
        if (char || fg || bg) {
            this._char = char;
            this._fg = fg;
            this._bg = bg;
        }
        else {
            this._char = '';
        }
    }
    Object.defineProperty(Glyph.prototype, "char", {
        get: function () { return this._char; },
        set: function (v) { this._char = v; },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Glyph.prototype, "fg", {
        get: function () { return this._fg; },
        set: function (v) { this._fg = v; },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Glyph.prototype, "bg", {
        get: function () { return this._bg; },
        set: function (v) { this._bg = v; },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    return Glyph;
}());
exports.Glyph = Glyph;
