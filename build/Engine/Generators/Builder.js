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
const Display = __importStar(require("../../Display"));
// TODO: Refactor much of this - make a MapManager.
class Builder {
    constructor(width, height) {
        this.tileArray = [];
        this._mapWidth = width;
        this._mapHeight = height;
    }
    width() { return this._mapWidth; }
    height() { return this._mapHeight; }
    generateTileArray() {
        for (let x = 0; x < this._mapWidth; x++) {
            this.tileArray.push([]);
            for (let y = 0; y < this._mapHeight; y++) {
                this.tileArray[x].push(Display.Tile.nullTile());
            }
        }
        return this.tileArray;
    }
    generateArea(tileArray) {
        let generator = new ROT.Map.Cellular(this._mapWidth, this._mapHeight);
        generator.randomize(0.5);
        let iterations = 3;
        for (let i = 0; i < iterations - 1; i++) {
            generator.create();
        }
        generator.create((x, y, v) => {
            if (v === 1) {
                tileArray[x][y] = Display.Tile.floorTile();
            }
            else {
                tileArray[x][y] = Display.Tile.wallTile();
            }
        });
        return tileArray;
    }
    getTile(x, y) {
        if (x < 0 || x >= this._mapWidth || y < 0 || y >= this._mapHeight) {
            return Display.Tile.nullTile();
        }
        else {
            return this.tileArray[x][y] || Display.Tile.nullTile();
        }
    }
}
exports.Builder = Builder;
