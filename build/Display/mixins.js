"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = exports.Recipient = exports.Sight = exports.Moveable = exports.Entity = void 0;
const ts_mixer_1 = require("ts-mixer");
const _1 = require("./");
ts_mixer_1.settings.prototypeStrategy = 'copy';
ts_mixer_1.settings.initFunction = 'init';
class Entity extends _1.Glyph {
    constructor(properties, game, map) {
        super(properties);
        this.properties = properties;
        this._name = properties['name'] || ' ';
        this._x = properties['x'] || 0;
        this._y = properties['y'] || 0;
        this._z = properties['z'] || 0;
        this.game = game || null;
        this.map = map || null;
    }
    get name() { return this._name; }
    set name(v) { this._name = v; }
    get x() { return this._x; }
    set x(v) { this._x = v; }
    get y() { return this._y; }
    set y(v) { this._y = v; }
    get z() { return this._z; }
    set z(v) { this._z = v; }
}
exports.Entity = Entity;
class Moveable {
    init(properties) {
        this.properties = properties;
        this.x = this.properties['x'];
        this.y = this.properties['y'];
        this.z = this.properties['z'];
        this.tryMove = (x, y, z, map) => {
            let tile = map.getTile(x, y, this.z);
            if (z < this.z) {
                if (tile.traversable['open'] === true && tile.traversable['direction'] === 'up') {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                }
                else {
                    console.log("You can't ascend here!");
                }
            }
            else if (z > this.z) {
                if (tile.traversable['open'] === true && tile.traversable['direction'] === 'down') {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                }
                else {
                    console.log("You can't descend here!");
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
exports.Moveable = Moveable;
class Sight {
    get sightRadius() { return this._sightRadius; }
    set sightRadius(value) { this._sightRadius = value; }
    init(properties) {
        this.properties = properties;
        this._sightRadius = properties['sightRadius'] || 5;
    }
}
exports.Sight = Sight;
class Recipient {
    get messages() { return this._messages; }
    init() {
        this._messages = [];
        this.receiveMessage = (message) => {
            this._messages.push(message);
        };
        this.clearMessages = () => {
            if (this._messages.length >= 2) {
                this._messages.shift();
            }
        };
    }
}
exports.Recipient = Recipient;
class Actor extends Recipient {
    init() {
        this.act = () => {
            this.game.refresh();
            this.map.engine.lock();
            this.clearMessages();
        };
    }
}
exports.Actor = Actor;
