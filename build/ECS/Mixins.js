"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combatant = exports.WanderActor = exports.MobActor = exports.PlayerActor = exports.Recipient = exports.Sight = exports.Moveable = exports.Controllable = void 0;
const ts_mixer_1 = require("ts-mixer");
const Game_1 = require("../Game");
ts_mixer_1.settings.prototypeStrategy = 'copy';
ts_mixer_1.settings.initFunction = 'init';
class Controllable {
    init(properties, map) {
        this.properties = properties;
        this.map = map;
        this.x = this.properties['x'];
        this.y = this.properties['y'];
        this.z = this.properties['z'];
        this.tryMove = (x, y, z) => {
            let tile = this.map.getTile(x, y, this.z);
            if (z < this.z) {
                if (tile.traversable['open'] === true && tile.traversable['direction'] === 'up') {
                    Game_1.Game.EVENTS.emit('player', 'tryMove', 'up', 'success');
                    Game_1.Game.EVENTS.emit('player', 'move', x, y, z);
                }
                else {
                    Game_1.Game.EVENTS.emit('player', 'tryMove', 'up', 'failure');
                }
            }
            else if (z > this.z) {
                if (tile.traversable['open'] === true && tile.traversable['direction'] === 'down') {
                    Game_1.Game.EVENTS.emit('player', 'tryMove', 'down', 'success');
                    Game_1.Game.EVENTS.emit('player', 'move', x, y, z);
                }
                else {
                    Game_1.Game.EVENTS.emit('player', 'tryMove', 'down', 'failure');
                }
            }
            else if (tile.walkable) {
                Game_1.Game.EVENTS.emit('player', 'tryMove', 'move', 'success');
                Game_1.Game.EVENTS.emit('player', 'move', x, y, z);
                return true;
            }
            else if (tile.diggable) {
                Game_1.Game.EVENTS.emit('player', 'tryMove', 'dig', 'success');
                this.map.dig(x, y, z);
                return true;
            }
            // Game.EVENTS.emit('player', 'tryMove', 'move', 'failure');
            return false;
        };
    }
}
exports.Controllable = Controllable;
class Moveable {
    init(properties, map) {
        this.properties = properties;
        this.map = map;
        this.x = this.properties['x'];
        this.y = this.properties['y'];
        this.z = this.properties['z'];
        this.tryMove = (x, y, z) => {
            let tile = this.map.getTile(x, y, this.z);
            if (z < this.z) {
                if (tile.traversable['open'] === true && tile.traversable['direction'] === 'up') {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                }
            }
            else if (z > this.z) {
                if (tile.traversable['open'] === true && tile.traversable['direction'] === 'down') {
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
            return false;
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
            tryMove: ['', '', '', ''],
            combat: []
        };
        this.receiveMessage = (sender, message) => {
            this._messages[sender].push(message);
        };
    }
}
exports.Recipient = Recipient;
class PlayerActor {
    init() {
        this.act = () => {
            this.game.refresh();
            this.map.engine.lock();
            this.game.messageManager.clearMessages(0, 'position');
            this.game.messageManager.clearMessages(4, 'tryMove', true);
        };
    }
}
exports.PlayerActor = PlayerActor;
class MobActor {
    init(properties) {
        this.properties = properties;
        this.x = this.properties['x'];
        this.y = this.properties['y'];
        this.z = this.properties['z'];
        this.act = () => {
            // this.game.refresh();
            // this.map.engine.lock();
            let moveOffset = (Math.round(Math.random()) === 1) ? 1 : -1;
            if (Math.round(Math.random()) === 1) {
                this.tryMove(this.x + moveOffset, this.y, this.z);
            }
            else {
                this.tryMove(this.x, this.y + moveOffset, this.z);
            }
        };
    }
}
exports.MobActor = MobActor;
class WanderActor {
    init() {
        this.position = this.properties['position'];
        let moveOffset = (Math.round(Math.random()) === 1) ? 1 : -1;
        if (Math.round(Math.random()) === 1) {
            this.tryMove(this.position['x'] + moveOffset, this.position['y'], this.position['z']);
        }
        else {
            this.tryMove(this.position['x'], this.position['y'] + moveOffset, this.position['z']);
        }
    }
}
exports.WanderActor = WanderActor;
class Combatant {
    init() {
        Game_1.Game.EVENTS.on("attack", (attacker, target) => {
            this.attack(attacker, target);
        });
        this.attack = (attacker, target) => {
        };
    }
}
exports.Combatant = Combatant;
