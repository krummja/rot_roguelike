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
const ROT = __importStar(require("rot-js"));
const _1 = require("./");
class Map {
    constructor(tiles, player) {
        this._tiles = tiles;
        this._depth = tiles.length;
        this._width = tiles[0].length;
        this._height = tiles[0][0].length;
        this._entities = {};
        // Start the ROT Engine
        this._scheduler = new ROT.Scheduler.Simple();
        this.engine = new ROT.Engine(this._scheduler);
        // Initialize player
        this.addEntityAtRandomPosition(player, 0);
        // Initialize mobs
        // Start FOV calculations
        this._fov = [];
        this.setupFov();
        this._explored = new Array(this._depth);
        this.setupExploredArray();
    }
    get tiles() { return this._tiles; }
    ;
    set tiles(v) { this._tiles = v; }
    ;
    get width() { return this._width; }
    ;
    set width(v) { this._width = v; }
    ;
    get height() { return this._height; }
    ;
    set height(v) { this._height = v; }
    ;
    get entities() { return this._entities; }
    set entities(value) { this._entities = value; }
    get scheduler() { return this._scheduler; }
    set scheduler(value) { this._scheduler = value; }
    get explored() { return this._explored; }
    getTile(x, y, z) {
        if (x < 0 || x >= this._width ||
            y < 0 || y >= this._height ||
            z < 0 || z >= this._depth) {
            return _1.Tile.nullTile();
        }
        else {
            return this.tiles[z][x][y] || _1.Tile.nullTile();
        }
    }
    getBgTint(x, y, z, map) {
        let tile = map.getTile(x, y, z);
        return tile.bg;
    }
    setupFov() {
        let map = this;
        for (let z = 0; z < this._depth; z++) {
            (function () {
                let depth = z;
                map._fov.push(new ROT.FOV.PreciseShadowcasting((x, y) => {
                    return !map.getTile(x, y, depth).opaque;
                }, { topology: 4 }));
            })();
        }
    }
    getFov(depth) {
        return this._fov[depth];
    }
    setupExploredArray() {
        for (let z = 0; z < this._depth; z++) {
            this._explored[z] = new Array(this._width);
            for (let x = 0; x < this._width; x++) {
                this._explored[z][x] = new Array(this._height);
                for (let y = 0; y < this._height; y++) {
                    this._explored[z][x][y] = false;
                }
            }
        }
    }
    setExplored(x, y, z, state) {
        let tile = this.getTile(x, y, z);
        if (tile.walkable || tile.diggable || tile.traversable['open'] === true) {
            this._explored[z][x][y] = state;
        }
    }
    isExplored(x, y, z) {
        if (this.getTile(x, y, z) !== _1.Tile.nullTile()) {
            return this._explored[z][x][y];
        }
        else {
            return false;
        }
    }
    dig(x, y, z) {
        if (this.getTile(x, y, z).diggable) {
            this.tiles[z][x][y] = _1.Tile.floorTile();
        }
    }
    getRandomFloorPosition(z) {
        let x = 0;
        let y = 0;
        while (this.getTile(x, y, z).walkable === false) {
            x = Math.floor(Math.random() * this._width);
            y = Math.floor(Math.random() * this._height);
        }
        return { x: x, y: y, z: z };
    }
    getEntityAt(x, y, z) {
        return this._entities[x + ',' + y + ',' + z];
    }
    getEntitiesWithinRadius(x, y, z, radius) {
        let results = [];
        let leftX = x - radius;
        let rightX = x + radius;
        let topY = y - radius;
        let bottomY = y + radius;
        for (let key in this._entities) {
            let entity = this._entities[key];
            if (entity.x >= leftX && entity.x <= rightX &&
                entity.y >= topY && entity.y <= bottomY &&
                entity.z == z) {
                results.push(entity);
            }
        }
    }
    addEntityAtRandomPosition(entity, z) {
        let position = this.getRandomFloorPosition(z);
        entity.x = position.x;
        entity.y = position.y;
        entity.z = position.z;
        this.addEntity(entity);
    }
    addEntity(entity) {
        entity.map = this;
        this.updateEntityPosition(entity);
        if (entity.hasOwnProperty('act')) {
            this._scheduler.add(entity, true);
        }
    }
    removeEntity(entity) {
        let key = entity.x + ',' + entity.y + ',' + entity.z;
        if (this._entities[key] == entity) {
            delete this._entities[key];
        }
        if (entity.hasOwnProperty('act')) {
            this._scheduler.remove(entity);
        }
    }
    updateEntityPosition(entity, oldX, oldY, oldZ) {
        if (typeof (oldX) !== "undefined") {
            let oldKey = oldX + ',' + oldY + ',' + oldZ;
            if (this._entities[oldKey] == entity) {
                delete this._entities[oldKey];
            }
        }
        if (entity.x < 0 || entity.x >= this._width ||
            entity.y < 0 || entity.y >= this._height ||
            entity.z < 0 || entity.z >= this._depth) {
            throw new Error('Entity\'s position is out of bounds.');
        }
        let key = entity.x + ',' + entity.y + ',' + entity.z;
        if (this._entities[key]) {
            throw new Error('Tried to add an entity at an occupied position.');
        }
        this._entities[key] = entity;
    }
}
exports.Map = Map;
