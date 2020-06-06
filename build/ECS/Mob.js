"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mob = void 0;
const _1 = require("./");
class Mob extends _1.Entity {
    constructor(properties, game, map) {
        super(properties);
        this.properties = properties;
        this.game = game || null;
        this.map = map || null;
    }
    setPosition(x, y, z) {
        // FIXME: Position implementation? Needed?
    }
    tryMove(x, y, z) {
        let map = this.map;
        let tile = map.getTile(x, y, this.z);
        let target = map.getEntityAt(x, y, this.z);
        if (z < this.z) {
            if (tile.traversable['open'] === true &&
                tile.traversable['direction'] === 'up') {
                this.setPosition(x, y, z);
            }
        }
        else if (z > this.z) {
            if (tile.traversable['open'] === true &&
                tile.traversable['direction'] === 'down') {
                this.setPosition(x, y, z);
            }
        }
        else if (target) {
            if (this.hasOwnProperty('attack')) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (tile.walkable) {
            this.setPosition(x, y, z);
            return true;
        }
        else if (tile.diggable) {
            map.dig(x, y, z);
            return true;
        }
        return false;
    }
    ;
}
exports.Mob = Mob;
