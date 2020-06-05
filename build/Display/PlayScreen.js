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
exports.PlayScreen = void 0;
const ROT = __importStar(require("rot-js"));
const ECS_1 = require("../ECS");
const Builder_1 = require("../Builder");
const _1 = require("./");
class PlayScreen {
    constructor(game) {
        this.mapArray = null;
        this.mapWidth = 200;
        this.mapHeight = 100;
        this.game = game;
        this._player = new ECS_1.Player({
            character: '@',
            name: 'Player',
            foreground: [228, 79, 163],
            background: [0, 0, 0] || null,
            sightRadius: 20,
        }, this.game, this.map);
    }
    get player() { return this._player; }
    enter() {
        let width = this.mapWidth;
        let height = this.mapHeight;
        let depth = 3;
        let ratio = 0.70;
        let iterations = 100;
        let tilesFilled = 50;
        let tiles = new Builder_1.Builder(width, height, depth, ratio, iterations, tilesFilled).tiles;
        this.map = new _1.Map(tiles, this._player);
        this.map.engine.start();
    }
    exit() {
        console.log('PlayScreen.exit:   Exited play screen.');
    }
    render(display) {
        let screenWidth = this.game.screenWidth;
        let screenHeight = this.game.screenHeight;
        // Figure out the viewport dimensions
        let topLeftX = Math.max(0, this._player.x - (screenWidth / 2));
        topLeftX = Math.min(topLeftX, this.map.width - screenWidth);
        let topLeftY = Math.max(0, this._player.y - (screenHeight / 2));
        topLeftY = Math.min(topLeftY, this.map.height - screenHeight);
        let visibleCells = {};
        let map = this.map;
        let currentDepth = this._player.z;
        // Handle FOV and explored flagging
        map.getFov(this._player.z).compute(this._player.x, this._player.y, this._player.sightRadius, (x, y, r, vis) => {
            visibleCells[x + "," + y] = true;
            map.setExplored(x, y, currentDepth, true);
        });
        // Put bounds on the viewport movement relative to the map edge
        for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
            for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
                // Check if the cell has been explored
                if (map.isExplored(x, y, currentDepth)) {
                    let tile = this.map.getTile(x, y, currentDepth);
                    let background = tile.bg;
                    let darken = (color) => {
                        let darkerColor = ROT.Color.interpolate(ROT.Color.multiply(color, [50, 50, 50]), [0, 0, 0]);
                        return darkerColor;
                    };
                    if (visibleCells[x + ',' + y]) {
                        background = tile.bg;
                    }
                    else {
                        background = (darken(background));
                    }
                    display.draw(x - topLeftX, y - topLeftY, tile.char, (ROT.Color.toHex(tile.fg)).toString(), (ROT.Color.toHex(background)).toString());
                }
            }
        }
        // Render the player
        if (visibleCells[this._player.x + ',' + this._player.y]) {
            display.draw(this._player.x - topLeftX, this._player.y - topLeftY, this._player.char, (ROT.Color.toHex(this._player.fg)).toString(), (ROT.Color.toHex(this._player.getBgTint(this._player.x, this._player.y, this._player.z, this.map))).toString());
        }
        this.game.messageManager.renderMessage(0, 0, 'position');
        this.game.messageManager.renderMessage(0, 39, 'tryMove', 'up');
    }
    handleInput(inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.KEYS.VK_NUMPAD4) {
                this.move(-1, 0, 0);
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD6) {
                this.move(1, 0, 0);
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD8) {
                this.move(0, -1, 0);
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD2) {
                this.move(0, 1, 0);
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD1) {
                this.move(0, 0, 1); // Move down
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD7) {
                this.move(0, 0, -1); // Move up
            }
            else {
                return;
            }
            this.map.engine.unlock();
            this.game.refresh();
        }
    }
    move(dX, dY, dZ) {
        let newX = this._player.x + dX;
        let newY = this._player.y + dY;
        let newZ = this._player.z + dZ;
        this._player.tryMove(newX, newY, newZ, this.map);
        this.game.messageManager.sendMessage(this._player, 'position', "Position: %s", [this._player.x + "," + this._player.y]);
    }
}
exports.PlayScreen = PlayScreen;
