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
exports.Builder = void 0;
var ROT = __importStar(require("rot-js"));
var game_1 = require("./game");
var Display_1 = require("./Display");
var Builder = /** @class */ (function () {
    function Builder(width, height, depth) {
        this._width = width;
        this._height = height;
        this._depth = depth;
        this._tiles = new Array(depth);
        this._regions = new Array(depth);
        for (var z = 0; z < depth; z++) {
            this._tiles[z] = this._generateLevel();
            this._regions[z] = new Array(width);
            for (var x = 0; x < width; x++) {
                this._regions[z][x] = new Array(height);
                for (var y = 0; y < height; y++) {
                    this._regions[z][x][y] = 0;
                }
            }
        }
        for (var z = 0; z < this._depth; z++) {
            this._setupRegions(z);
        }
        this._connectAllRegions();
    }
    Object.defineProperty(Builder.prototype, "width", {
        get: function () { return this._width; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Builder.prototype, "height", {
        get: function () { return this._height; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Builder.prototype, "depth", {
        get: function () { return this._depth; },
        set: function (value) { this._depth = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Builder.prototype, "tiles", {
        get: function () { return this._tiles; },
        set: function (value) { this._tiles = value; },
        enumerable: false,
        configurable: true
    });
    Builder.prototype._generateLevel = function () {
        // Generate a 2D Array to represent all of the tiles on a map;
        var map = new Array(this._width);
        for (var w = 0; w < this._width; w++) {
            map[w] = new Array(this._height);
        }
        var generator = new ROT.Map.Cellular(this._width, this._height);
        generator.randomize(5);
        var totalIterations = 3;
        for (var i = 0; i < totalIterations - 1; i++) {
            generator.create();
        }
        generator.create(function (x, y, v) {
            if (v === 1) {
                map[x][y] = Display_1.Tile.floorTile();
            }
            else {
                map[x][y] = Display_1.Tile.wallTile();
            }
        });
        return map;
    };
    Builder.prototype._canFillRegion = function (x, y, z) {
        // Check if the tile is within the world boundaries.
        if (x < 0 || y < 0 || z < 0 || x >= this._width || y >= this._height || z >= this._depth) {
            return false;
        }
        // Check if the tile already has a region assigned to it.
        if (this._regions[z][x][y] != 0) {
            return false;
        }
        // Flag the tile as walkable.
        return this._tiles[z][x][y].walkable;
    };
    Builder.prototype._fillRegion = function (region, x, y, z) {
        var tilesFilled = 1;
        var tiles = [{ x: x, y: y }];
        var tile;
        var neighbors;
        this._regions[z][x][y] = region;
        while (tiles.length > 0) {
            tile = tiles.pop();
            neighbors = game_1.Game.getNeighborPositions(tile.x, tile.y);
            while (neighbors.length > 0) {
                tile = neighbors.pop();
                if (this._canFillRegion(tile.x, tile.y, z)) {
                    this._regions[z][tile.x][tile.y] = region;
                    tiles.push(tile);
                    tilesFilled++;
                }
            }
        }
        return tilesFilled;
    };
    Builder.prototype._removeRegion = function (region, z) {
        for (var x = 0; x < this._width; x++) {
            for (var y = 0; y < this._height; y++) {
                if (this._regions[z][x][y] == region) {
                    this._regions[z][x][y] = 0;
                    this._tiles[z][x][y] = Display_1.Tile.wallTile();
                }
            }
        }
    };
    Builder.prototype._setupRegions = function (z) {
        var region = 1;
        var tilesFilled;
        for (var x = 0; x < this._width; x++) {
            for (var y = 0; y < this._height; y++) {
                if (this._canFillRegion(x, y, z)) {
                    tilesFilled = this._fillRegion(region, x, y, z);
                    if (tilesFilled <= 20) {
                        this._removeRegion(region, z);
                    }
                    else {
                        region++;
                    }
                }
            }
        }
    };
    Builder.prototype._findRegionOverlaps = function (z, r1, r2) {
        var matches = [];
        for (var x = 0; x < this._width; x++) {
            for (var y = 0; y < this._height; y++) {
                if (this._tiles[z][x][y].walkable &&
                    this._tiles[z + 1][x][y].walkable &&
                    this._regions[z][x][y] == r1 &&
                    this._regions[z + 1][x][y] == r2) {
                    matches.push({ x: x, y: y });
                }
            }
        }
        return matches;
    };
    Builder.prototype._connectRegions = function (z, r1, r2) {
        var overlap = this._findRegionOverlaps(z, r1, r2);
        if (overlap.length == 0) {
            return false;
        }
        var point = overlap[0];
        this._tiles[z][point.x][point.y] = Display_1.Tile.stairsDownTile();
        this._tiles[z + 1][point.x][point.y] = Display_1.Tile.stairsUpTile();
        return true;
    };
    Builder.prototype._connectAllRegions = function () {
        for (var z = 0; z < this._depth - 1; z++) {
            var connected = {};
            var key = void 0;
            for (var x = 0; x < this._width; x++) {
                for (var y = 0; y < this._height; y++) {
                    key = this._regions[z][x][y] + ',' + this._regions[z + 1][x][y];
                    if (this._tiles[z][x][y].walkable && this._tiles[z + 1][x][y].walkable && !connected[key]) {
                        this._connectRegions(z, this._regions[z][x][y], this._regions[z + 1][x][y]);
                        connected[key] = true;
                    }
                }
            }
        }
    };
    return Builder;
}());
exports.Builder = Builder;
