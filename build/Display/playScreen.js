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
var ROT = __importStar(require("rot-js"));
var builder_1 = require("../builder");
var _1 = require("./");
var PlayScreen = /** @class */ (function () {
    function PlayScreen(game) {
        this.mapArray = null;
        this.mapWidth = 200;
        this.mapHeight = 200;
        this.game = game;
        this._player = new _1.Player({
            character: '@',
            name: 'Player',
            foreground: '#e44fa3',
            background: '' || 'black'
        }, this.game, this.map);
        // FIXME: Holy shit this is messy lol. If anyone sees this please no judge. :<
    }
    PlayScreen.prototype.enter = function () {
        var width = 128;
        var height = 80;
        var depth = 6;
        var tiles = new builder_1.Builder(width, height, depth).tiles;
        this.map = new _1.Map(tiles, this._player);
        this.map.engine.start();
    };
    PlayScreen.prototype.exit = function () {
        console.log('PlayScreen.exit:   Exited play screen.');
    };
    PlayScreen.prototype.render = function (display) {
        var screenWidth = this.game.screenWidth;
        var screenHeight = this.game.screenHeight;
        // Figure out the viewport dimensions
        var topLeftX = Math.max(0, this._player.x - (screenWidth / 2));
        topLeftX = Math.min(topLeftX, this.map.width - screenWidth);
        var topLeftY = Math.max(0, this._player.y - (screenHeight / 2));
        topLeftY = Math.min(topLeftY, this.map.height - screenHeight);
        // Put bounds on the viewport movement relative to the map edge
        for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
            for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
                var tile = this.map.getTile(x, y, this._player.z);
                display.draw(x - topLeftX, y - topLeftY, tile.char, tile.fg, tile.bg);
            }
        }
        // Render the player
        display.draw(this._player.x - topLeftX, this._player.y - topLeftY, this._player.char, this._player.fg, this._player.getBgTint(this._player.x, this._player.y, this._player.z, this.map));
    };
    PlayScreen.prototype.handleInput = function (inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
                console.log('Enter key pressed!');
            }
            if (inputData.keyCode === ROT.KEYS.VK_LEFT) {
                this.move(-1, 0, 0);
            }
            else if (inputData.keyCode === ROT.KEYS.VK_RIGHT) {
                this.move(1, 0, 0);
            }
            else if (inputData.keyCode === ROT.KEYS.VK_UP) {
                this.move(0, -1, 0);
            }
            else if (inputData.keyCode === ROT.KEYS.VK_DOWN) {
                this.move(0, 1, 0);
            }
            this.map.engine.unlock();
            this.game.refresh();
        }
        else if (inputType === 'keypress') {
            var keyChar = String.fromCharCode(inputData.charCode);
            if (keyChar === '>') {
                this.move(0, 0, 1);
            }
            else if (keyChar === '<') {
                this.move(0, 0, -1);
            }
            else {
                return;
            }
            this.map.engine.unlock();
            this.game.refresh();
        }
    };
    PlayScreen.prototype.move = function (dX, dY, dZ) {
        var newX = this._player.x + dX;
        var newY = this._player.y + dY;
        var newZ = this._player.z + dZ;
        this._player.tryMove(newX, newY, newZ, this.map);
        console.log(this._player);
    };
    return PlayScreen;
}());
exports.PlayScreen = PlayScreen;
