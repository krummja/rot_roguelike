"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = exports.Recipient = exports.Sight = exports.Moveable = void 0;
const ts_mixer_1 = require("ts-mixer");
const Game_1 = require("../Game");
ts_mixer_1.settings.prototypeStrategy = 'copy';
ts_mixer_1.settings.initFunction = 'init';
class Moveable {
    init(properties) {
        this.properties = properties;
        this.x = this.properties['x'];
        this.y = this.properties['y'];
        this.z = this.properties['z'];
        this._EVENTS = Game_1.Game.EVENTS;
        this.tryMove = (x, y, z, map) => {
            let tile = map.getTile(x, y, this.z);
            if (z < this.z) {
                if (tile.traversable['open'] === true && tile.traversable['direction'] === 'up') {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this._EVENTS.emit('tryMove', 'You follow the passage upward.');
                }
                else {
                    this._EVENTS.emit('tryMove', 'You can\'t ascend here!');
                }
            }
            else if (z > this.z) {
                if (tile.traversable['open'] === true && tile.traversable['direction'] === 'down') {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this._EVENTS.emit('tryMove', 'You follow the passage downward.');
                }
                else {
                    this._EVENTS.emit('tryMove', 'You can\'t descend here!');
                }
            }
            else if (tile.walkable) {
                this.x = x;
                this.y = y;
                this.z = z;
                this._EVENTS.emit('tryMove', ' ');
                return true;
            }
            else if (tile.diggable) {
                map.dig(x, y, z);
                this._EVENTS.emit('tryMove', 'The stone gives and crumbles at your feet!');
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
        this._messages = {
            position: [],
            tryMove: [],
            combat: []
        };
        this.receiveMessage = (sender, message) => {
            this._messages[sender].push(message);
        };
    }
}
exports.Recipient = Recipient;
class Actor extends Recipient {
    init() {
        this.act = () => {
            this.game.refresh();
            this.map.engine.lock();
            this.game.messageManager.clearMessages(0, 'position');
            this.game.messageManager.clearMessages(3, 'tryMove');
        };
    }
}
exports.Actor = Actor;
