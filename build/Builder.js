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
const ROT = __importStar(require("rot-js"));
const utils_1 = require("./utils");
const Display_1 = require("./Display");
class Builder {
    constructor(width, height, depth, ratio, iterations, tilesFilled) {
        this.done = false;
        this._width = width;
        this._height = height;
        this._depth = depth;
        this._ratio = ratio;
        this._iterations = iterations;
        this._tilesFilled = tilesFilled;
        this._tiles = new Array(depth);
        this._regions = new Array(depth);
        for (let z = 0; z < depth; z++) {
            this._tiles[z] = this._generateLevel();
            this._regions[z] = new Array(width);
            for (let x = 0; x < width; x++) {
                this._regions[z][x] = new Array(height);
                for (let y = 0; y < height; y++) {
                    this._regions[z][x][y] = 0;
                }
            }
        }
        for (let z = 0; z < this._depth; z++) {
            this._setupRegions(z);
        }
        this._connectAllRegions();
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get depth() { return this._depth; }
    set depth(value) { this._depth = value; }
    get tiles() { return this._tiles; }
    set tiles(value) { this._tiles = value; }
    _generateLevel() {
        let map = new Array(this._width);
        let generator = new ROT.Map.Cellular(this._width, this._height);
        let totalIterations = this._iterations;
        for (let w = 0; w < this._width; w++) {
            map[w] = new Array(this._height);
        }
        generator.randomize(this._ratio);
        for (let i = 0; i < totalIterations - 1; i++) {
            generator.create();
        }
        generator.create((x, y, v) => {
            if (v === 1) {
                map[x][y] = Display_1.Tile.floorTile();
            }
            else {
                map[x][y] = Display_1.Tile.wallTile();
            }
        });
        return map;
    }
    _canFillRegion(x, y, z) {
        if (x < 0 || y < 0 || z < 0 || x >= this._width || y >= this._height || z >= this._depth) {
            return false;
        }
        if (this._regions[z][x][y] != 0) {
            return false;
        }
        return this._tiles[z][x][y].walkable;
    }
    _fillRegion(region, x, y, z) {
        let tilesFilled = 1;
        let tiles = [{ x: x, y: y }];
        let tile;
        let neighbors;
        this._regions[z][x][y] = region;
        while (tiles.length > 0) {
            tile = tiles.pop();
            neighbors = this.getNeighborPositions(tile.x, tile.y);
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
    }
    _removeRegion(region, z) {
        for (let x = 0; x < this._width; x++) {
            for (let y = 0; y < this._height; y++) {
                if (this._regions[z][x][y] == region) {
                    this._regions[z][x][y] = 0;
                    this._tiles[z][x][y] = Display_1.Tile.wallTile();
                }
            }
        }
    }
    _setupRegions(z) {
        let region = 1;
        let tilesFilled;
        for (let x = 0; x < this._width; x++) {
            for (let y = 0; y < this._height; y++) {
                if (this._canFillRegion(x, y, z)) {
                    tilesFilled = this._fillRegion(region, x, y, z);
                    if (tilesFilled <= this._tilesFilled) {
                        this._removeRegion(region, z);
                    }
                    else {
                        region++;
                    }
                }
            }
        }
    }
    _findRegionOverlaps(z, r1, r2) {
        let matches = [];
        for (let x = 0; x < this._width; x++) {
            for (let y = 0; y < this._height; y++) {
                if (this._tiles[z][x][y].walkable &&
                    this._tiles[z + 1][x][y].walkable &&
                    this._regions[z][x][y] == r1 &&
                    this._regions[z + 1][x][y] == r2) {
                    matches.push({ x: x, y: y });
                }
            }
        }
        return matches;
    }
    _connectRegions(z, r1, r2) {
        let overlap = this._findRegionOverlaps(z, r1, r2);
        if (overlap.length == 0) {
            return false;
        }
        let point = overlap[0];
        this._tiles[z][point.x][point.y] = Display_1.Tile.stairsDownTile();
        this._tiles[z + 1][point.x][point.y] = Display_1.Tile.stairsUpTile();
        return true;
    }
    _connectAllRegions() {
        for (let z = 0; z < this._depth - 1; z++) {
            let connected = {};
            let key;
            for (let x = 0; x < this._width; x++) {
                for (let y = 0; y < this._height; y++) {
                    key = this._regions[z][x][y] + ',' + this._regions[z + 1][x][y];
                    if (this._tiles[z][x][y].walkable && this._tiles[z + 1][x][y].walkable && !connected[key]) {
                        this._connectRegions(z, this._regions[z][x][y], this._regions[z + 1][x][y]);
                        connected[key] = true;
                    }
                }
            }
        }
    }
    getNeighborPositions(x, y) {
        let tiles = [];
        for (let dX = -1; dX < 2; dX++) {
            for (let dY = -1; dY < 2; dY++) {
                if (dX == 0 && dY == 0) {
                    continue;
                }
                tiles.push({ x: x + dX, y: y + dY });
            }
        }
        return utils_1.shuffleCoordArray(tiles);
    }
}
exports.Builder = Builder;
