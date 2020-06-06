"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combatant = exports.Mob = exports.Actor = exports.Recipient = exports.Sight = void 0;
const ts_mixer_1 = require("ts-mixer");
const Game_1 = require("../Game");
ts_mixer_1.settings.prototypeStrategy = 'copy';
ts_mixer_1.settings.initFunction = 'init';
// export class Moveable implements IMixin
// {
//   public properties: IProperties;
//   public x: number;
//   public y: number;
//   public z: number;
//   public tryMove: (x: number, y: number, z: number, ...args: any[]) => boolean;
//   public getBgTint: (x: number, y: number, z: number, ...args: any[]) => [number, number, number];
//   private _EVENTS: EventEmitter;
//   public init(properties: IProperties): void
//   {
//     this.properties = properties;
//     this.x = this.properties['x'];
//     this.y = this.properties['y'];
//     this.z = this.properties['z'];
//     this._EVENTS = Game.EVENTS;
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
//           this._EVENTS.emit('tryMove', 'You follow the passage upward.');
//         } else {
//            this._EVENTS.emit('tryMove', 'You can\'t ascend here!');
//         }
//       } else if (z > this.z) {
//         if (tile.traversable['open'] === true && tile.traversable['direction'] === 'down') {
//           this.x = x;
//           this.y = y;
//           this.z = z;
//           this._EVENTS.emit('tryMove', 'You follow the passage downward.');
//         } else {
//           this._EVENTS.emit('tryMove', 'You can\'t descend here!');
//         }
//       } else if (tile.walkable) {
//         this.x = x;
//         this.y = y;
//         this.z = z;
//         this._EVENTS.emit('tryMove', "");
//         return true;
//       } else if (tile.diggable) {
//         map.dig(x, y, z);
//         this._EVENTS.emit('tryMove', 'The stone gives and crumbles at your feet!');
//         return true;
//       }
//       return false;
//     };
//   }
// }
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
class Actor {
    init() {
        this.act = () => {
            this.game.refresh();
            this.map.engine.lock();
            this.game.messageManager.clearMessages(0, 'position');
            this.game.messageManager.clearMessages(4, 'tryMove', true);
        };
    }
}
exports.Actor = Actor;
class Mob {
    init(properties) {
        this.x = this.properties['x'];
        this.y = this.properties['y'];
        this.z = this.properties['z'];
        this.act = () => {
            let moveOffset = (Math.round(Math.random()) === 1) ? 1 : -1;
            if (Math.round(Math.random()) === 1) {
                this.tryMove(this.x + moveOffset, this.y, this.z);
            }
            else {
                this.tryMove(this.x, this.y + moveOffset, this.z);
            }
            this.game.refresh();
            this.map.engine.lock();
        };
    }
}
exports.Mob = Mob;
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
