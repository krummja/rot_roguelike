"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionManager = void 0;
const Game_1 = require("./Game");
class PositionManager {
    constructor(screen) {
        this._screen = screen;
        this._player = this._screen.player;
        this._map = this._screen.map;
        Game_1.Game.EVENTS.on('player', (action, x, y, z) => {
            let entity = this._player;
            // Action: move
            if (action === 'move') {
                this._map.setPosition(entity, x, y, z);
            }
        });
    }
}
exports.PositionManager = PositionManager;
