"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combatant = exports.WanderActor = exports.MobActor = exports.PlayerActor = exports.Recipient = exports.Sight = exports.Moveable = void 0;
const ts_mixer_1 = require("ts-mixer");
const Game_1 = require("../Game");
ts_mixer_1.settings.prototypeStrategy = 'copy';
ts_mixer_1.settings.initFunction = 'init';
// export class Controllable implements IMixin
// {
//   public properties: IProperties;
//   public x: number;
//   public y: number;
//   public z: number;
//   public tryMove: (x: number, y: number, z: number, ...args: any[]) => boolean;
//   public getBgTint: (x: number, y: number, z: number, ...args: any[]) => [number, number, number];
//   public init(properties: IProperties): void
//   {
//     this.properties = properties;
//     this.x = this.properties['x'];
//     this.y = this.properties['y'];
//     this.z = this.properties['z'];
//     Game.EVENTS = Game.EVENTS;
//     this.tryMove = (
//       x: number, 
//       y: number, 
//       z: number,
//       map: Map
//     ): boolean => {
//       let tile = map.getTile(x, y, this.z);
//       if (z < this.z) {
//         if (tile.traversable['open'] === true && tile.traversable['direction'] === 'up') {
//             this.x = x;
//             this.y = y;
//             this.z = z;
//           Game.EVENTS.emit('tryMove', 'You follow the passage upward.');
//         } else {
//            Game.EVENTS.emit('tryMove', 'You can\'t ascend here!');
//         }
//       } else if (z > this.z) {
//         if (tile.traversable['open'] === true && tile.traversable['direction'] === 'down') {
//           this.x = x;
//           this.y = y;
//           this.z = z;
//           Game.EVENTS.emit('tryMove', 'You follow the passage downward.');
//         } else {
//           Game.EVENTS.emit('tryMove', 'You can\'t descend here!');
//         }
//       } else if (tile.walkable) {
//         this.x = x;
//         this.y = y;
//         this.z = z;
//         Game.EVENTS.emit('tryMove', "");
//         return true;
//       } else if (tile.diggable) {
//         map.dig(x, y, z);
//         Game.EVENTS.emit('tryMove', 'The stone gives and crumbles at your feet!');
//         return true;
//       }
//       return false;
//     };
//   }
// }
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
            else if (tile.diggable) {
                map.dig(x, y, z);
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
    init() {
        this.position = this.properties['position'];
        this.act = () => {
            this.game.refresh();
            this.map.engine.lock();
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
