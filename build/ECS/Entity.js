"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Display_1 = require("../Display");
const Game_1 = require("../Game");
class Entity extends Display_1.Glyph {
    constructor(properties, game, map) {
        super(properties);
        this.properties = properties;
        this._name = properties['name'] || ' ';
        this._x = properties['x'] || 0;
        this._y = properties['y'] || 0;
        this._z = properties['z'] || 0;
        this.game = game || null;
        this.map = map || null;
        this._EVENTS = Game_1.Game.EVENTS;
    }
    get name() { return this._name; }
    set name(v) { this._name = v; }
    get x() { return this._x; }
    set x(v) { this._x = v; }
    get y() { return this._y; }
    set y(v) { this._y = v; }
    get z() { return this._z; }
    set z(v) { this._z = v; }
    setPosition(x, y, z) {
        let oldX = this._x;
        let oldY = this._y;
        let oldZ = this._z;
        this._x = x;
        this._y = y;
        this._z = z;
        if (this.map) {
            this.map.updateEntityPosition(this, oldX, oldY, oldZ);
        }
    }
    tryMove(x, y, z) {
        let map = this.map;
        let tile = map.getTile(x, y, this.z);
        let target = map.getEntityAt(x, y, this.z);
        if (z < this.z) {
            if (tile.traversable['open'] === true &&
                tile.traversable['direction'] === 'up') {
                this.setPosition(x, y, z);
                this._EVENTS.emit('tryMove', 'You follow the passage upward.');
            }
            else {
                this._EVENTS.emit('tryMove', 'You can\'t ascend here!');
            }
        }
        else if (z > this.z) {
            if (tile.traversable['open'] === true &&
                tile.traversable['direction'] === 'down') {
                this.setPosition(x, y, z);
                this._EVENTS.emit('tryMove', 'You follow the passage downward.');
            }
            else {
                this._EVENTS.emit('tryMove', 'You can\'t descend here!');
            }
        }
        else if (target) {
            if (this.hasOwnProperty('attack')) {
                this._EVENTS.emit('attack', this, target);
                return true;
            }
            else {
                return false;
            }
        }
        else if (tile.walkable) {
            this.setPosition(x, y, z);
            this._EVENTS.emit('tryMove', "");
            return true;
        }
        else if (tile.diggable) {
            map.dig(x, y, z);
            this._EVENTS.emit('tryMove', 'The stone gives and crumbles at your feet!');
            return true;
        }
        return false;
    }
    ;
}
exports.Entity = Entity;
