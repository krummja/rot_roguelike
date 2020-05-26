"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glyph = exports.Tile = void 0;
var Glyph = /** @class */ (function () {
    function Glyph(properties) {
        this._map = null;
        this._char = properties['character'] || ' ';
        this._fg = properties['foreground'] || 'white';
        this._bg = properties['background'] || 'black';
        this._walkable = properties['isWalkable'] || false;
        this._diggable = properties['isDiggable'] || false;
        this._traverseable = properties['isTraverseable'] || false;
        this._blocksLight = (properties['blocksLight'] !== undefined) ? properties['blocksLight'] : true;
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
    Object.defineProperty(Glyph.prototype, "traverseable", {
        get: function () { return this._traverseable; },
        set: function (v) { this._traverseable = v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Glyph.prototype, "blocksLight", {
        get: function () { return this._blocksLight; },
        set: function (value) { this._blocksLight = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Glyph.prototype, "map", {
        get: function () { return this._map; },
        set: function (value) { this._map = value; },
        enumerable: false,
        configurable: true
    });
    return Glyph;
}());
exports.Glyph = Glyph;
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile(properties) {
        return _super.call(this, properties) || this;
    }
    Tile.nullTile = function () {
        return new Tile({});
    };
    Tile.floorTile = function () {
        var colors = ['#29231c', '#332d25', '#25211d', '#292018'];
        return new Tile({
            character: ' ',
            background: this.pickColor(colors),
            isWalkable: true,
            isTraverseable: false,
            blocksLight: false,
        });
    };
    Tile.wallTile = function () {
        var colors = ['#9a7e61', '#a78a6d', '#a08467', '#ad9173'];
        return new Tile({
            character: ' ',
            background: this.pickColor(colors),
            isDiggable: true,
            isTraverseable: false,
            blocksLight: true
        });
    };
    Tile.stairsUpTile = function () {
        return new Tile({
            character: '<',
            foreground: 'white',
            isWalkable: true,
            isTraverseable: true,
        });
    };
    Tile.stairsDownTile = function () {
        return new Tile({
            character: '>',
            foreground: 'gray',
            isWalkable: true,
            isTraverseable: true,
        });
    };
    Tile.pickColor = function (colors) {
        var index = Math.floor(Tile.random(0, 4));
        return colors[index];
    };
    Tile.random = function (mn, mx) {
        return Math.random() * (mx - mn) + mn;
    };
    return Tile;
}(Glyph));
exports.Tile = Tile;
