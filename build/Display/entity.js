"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = exports.Mob = exports.Player = exports.Entity = void 0;
const ts_mixer_1 = require("ts-mixer");
const _1 = require("./");
ts_mixer_1.settings.prototypeStrategy = 'copy';
ts_mixer_1.settings.initFunction = 'init';
class Entity extends _1.Glyph {
    constructor(properties) {
        super(properties);
        this._name = properties['name'] || ' ';
        this._x = properties['x'] || 0;
        this._y = properties['y'] || 0;
        this._z = properties['z'] || 0;
        this.map = null;
    }
    // I think the movement system is changing the Entity base class's x,y,z values...
    get name() { return this._name; }
    set name(v) { this._name = v; }
    get x() { return this._x; }
    set x(v) { this._x = v; }
    get y() { return this._y; }
    set y(v) { this._y = v; }
    get z() { return this._z; }
    set z(v) { this._z = v; }
    setPosition(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
    }
}
exports.Entity = Entity;
class HitCounter {
    constructor(properties) {
        this._multiplier = properties["multiplier"];
        this._totalHits = 0;
        this.incrementHit = () => { this._totalHits += this._multiplier; };
        this.getTotalHits = () => { return this._totalHits; };
    }
}
class Combatant extends ts_mixer_1.Mixin(Entity, HitCounter) {
}
class Moveable {
    constructor(properties) {
        this.properties = properties;
        this.x = this.properties['x'];
        this.y = this.properties['y'];
        this.z = this.properties['z'];
    }
    init(properties) {
        this.tryMove = (x, y, z, map) => {
            let tile = map.getTile(x, y, this.z);
            if (z < this.z) {
                if (!tile.traversable) {
                    console.log("You can't ascend here!");
                }
                else {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                }
            }
            else if (z > this.z) {
                if (!tile.traversable) {
                    console.log("You can't descend here!");
                }
                else {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                }
            }
            else if (tile.walkable) {
                this.x = x;
                this.y = y;
                this.z = z;
                return true;
            }
            else if (tile.diggable) {
                map.dig(x, y, z);
                return true;
            }
            return false;
        };
        this.getBgTint = (x, y, z, map) => {
            let tile = map.getTile(x, y, z);
            return tile.bg;
        };
    }
}
class Sight {
    constructor(properties) {
        this.properties = properties;
        this._sightRadius = properties['sightRadius'];
    }
    get sightRadius() { return this._sightRadius; }
    set sightRadius(value) { this._sightRadius = value; }
    init(properties) {
        this._sightRadius = properties['sightRadius'] || 5;
    }
}
class Actor {
    constructor(properties, game, map) {
        this.properties = properties;
        this.game = game;
        this.map = map;
    }
    init(properties) {
        this.act = () => {
            this.game.refresh();
            this.map.engine.lock();
        };
    }
}
exports.Actor = Actor;
class Player extends ts_mixer_1.Mixin(Entity, Moveable, Sight, Actor) {
}
exports.Player = Player;
class Mob extends ts_mixer_1.Mixin(Entity, Moveable, Actor) {
}
exports.Mob = Mob;