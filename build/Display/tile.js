"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
var _1 = require("./");
var Tile = /** @class */ (function () {
    function Tile(glyph) {
        this._glyph = glyph;
    }
    Object.defineProperty(Tile.prototype, "glyph", {
        get: function () { return this._glyph; },
        set: function (v) { this._glyph = v; },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Tile.nullTile = function () {
        return new Tile(new _1.Glyph());
    };
    Tile.floorTile = function () {
        return new Tile(new _1.Glyph('.'));
    };
    Tile.wallTile = function () {
        return new Tile(new _1.Glyph('#', 'goldenrod'));
    };
    return Tile;
}());
exports.Tile = Tile;
