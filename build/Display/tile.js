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
exports.Tile = void 0;
var _1 = require("./");
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile(properties) {
        return _super.call(this, properties) || this;
    }
    Tile.nullTile = function () {
        return new Tile({});
    };
    Tile.floorTile = function () {
        return new Tile({
            character: '.',
            isWalkable: true
        });
    };
    Tile.wallTile = function () {
        return new Tile({
            character: '#',
            foreground: 'goldenrod',
            isDiggable: true
        });
    };
    return Tile;
}(_1.Glyph));
exports.Tile = Tile;
