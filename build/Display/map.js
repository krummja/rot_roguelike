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
    function Map(tiles, player) {
        this._tiles = tiles;
        this._width = tiles.length;
        this._height = tiles[0].length;
        this._entities = [];
        this._scheduler = new ROT.Scheduler.Simple();
        this._engine = new ROT.Engine(this._scheduler);
        this.addEntityAtRandomLocation(player);
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
    Object.defineProperty(Map.prototype, "entities", {
        get: function () { return this._entities; },
        set: function (value) { this._entities = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "engine", {
        get: function () { return this._engine; },
        set: function (value) { this._engine = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "scheduler", {
        get: function () { return this._scheduler; },
        set: function (value) { this._scheduler = value; },
        enumerable: false,
        configurable: true
    });
    Map.generate = function (map, width, height, player) {
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
        return new Map(map, player);
    };
    Map.prototype.dig = function (x, y) {
        if (this.getTile(x, y).diggable) {
            this.tiles[x][y] = _1.Tile.floorTile();
        }
    };
    Map.prototype.getRandomFloorPosition = function () {
        var x = 0;
        var y = 0;
        while (this.getTile(x, y).walkable === false) {
            x = Math.floor(Math.random() * this._width);
            y = Math.floor(Math.random() * this._height);
        }
        return { x: x, y: y };
    };
    Map.prototype.getTile = function (x, y) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
            return _1.Tile.nullTile();
        }
        else {
            return this.tiles[x][y] || _1.Tile.nullTile();
        }
    };
    Map.prototype.getEntityAt = function (x, y) {
        for (var i = 0; i < this._entities.length; i++) {
            if (this._entities[i].x == x && this._entities[i].y == y) {
                return this._entities[i];
            }
        }
        return false;
    };
    Map.prototype.addEntity = function (entity) {
        if (entity.x < 0 || entity.y >= this._width || entity.y < 0 || entity.y >= this._height) {
            throw new Error('Adding entity out of bounds');
        }
        entity.map = this;
        this._entities.push(entity);
        if (entity.hasOwnProperty('act')) {
            this._scheduler.add(entity, true);
        }
    };
    Map.prototype.addEntityAtRandomLocation = function (entity) {
        var position = this.getRandomFloorPosition();
        entity.x = position.x;
        entity.y = position.y;
        this.addEntity(entity);
    };
    return Map;
}());
exports.Map = Map;
