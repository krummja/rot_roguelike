"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map = void 0;
var ROT = __importStar(require("rot-js"));
var _1 = require("./");
var Map = /** @class */ (function () {
    function Map(tiles) {
        this._tiles = tiles;
        this._width = tiles.length;
        this._height = tiles[0].length;
    }
    Object.defineProperty(Map.prototype, "tiles", {
        get: function () { return this._tiles; },
        set: function (v) { this._tiles = v; },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Map.prototype, "width", {
        get: function () { return this._width; },
        set: function (v) { this._width = v; },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Map.prototype, "height", {
        get: function () { return this._height; },
        set: function (v) { this._height = v; },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Map.generate = function (map, width, height) {
        var generator = new ROT.Map.Cellular(width, height);
        generator.randomize(0.5);
        var totalIterations = 3;
        for (var i = 0; i < totalIterations - 1; i++) {
            generator.create();
        }
        generator.create(function (x, y, v) {
            if (v === 1) {
                map[x][y] = _1.Tile.floorTile();
            }
            else {
                map[x][y] = _1.Tile.wallTile();
            }
        });
        return new Map(map);
    };
    Map.prototype.getTile = function (x, y) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
            return _1.Tile.nullTile();
        }
        else {
            return this._tiles[x][y] || _1.Tile.nullTile();
        }
    };
    return Map;
}());
exports.Map = Map;
