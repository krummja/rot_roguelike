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
var _1 = require("./");
var PlayScreen = /** @class */ (function () {
    function PlayScreen(game) {
        this._centerX = 0;
        this._centerY = 0;
        this.map = null;
        this.mapWidth = 200;
        this.mapHeight = 200;
        this.game = game;
    }
    PlayScreen.prototype.enter = function () {
        console.log('PlayScreen.enter:  Entered play screen.');
        this.map = [];
        for (var x = 0; x < this.mapWidth; x++) {
            this.map.push([]);
            for (var y = 0; y < this.mapHeight; y++) {
                this.map[x].push(_1.Tile.nullTile());
            }
        }
        this._map = _1.Map.generate(this.map, this.mapWidth, this.mapHeight);
        console.log(this._map);
    };
    PlayScreen.prototype.exit = function () {
        console.log('PlayScreen.exit:   Exited play screen.');
    };
    PlayScreen.prototype.render = function (display) {
        var screenWidth = this.game.screenWidth;
        var screenHeight = this.game.screenHeight;
        // Figure out the viewport dimensions
        var topLeftX = Math.max(0, this._centerX - (screenWidth / 2));
        topLeftX = Math.min(topLeftX, this._map.width - screenWidth);
        var topLeftY = Math.max(0, this._centerY - (screenHeight / 2));
        topLeftY = Math.min(topLeftY, this._map.height - screenHeight);
        // Put bounds on the viewport movement relative to the map edge
        for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
            for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
                var glyph = this._map.getTile(x, y).glyph;
                display.draw(x - topLeftX, y - topLeftY, glyph.char, glyph.fg, glyph.bg);
            }
        }
        // Render the player
        display.draw(this._centerX - topLeftX, this._centerY - topLeftY, '@', 'white', 'black');
    };
    PlayScreen.prototype.handleInput = function (inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
                console.log('Enter key pressed!');
            }
            if (inputData.keyCode === ROT.KEYS.VK_LEFT) {
                this.move(-1, 0);
            }
            else if (inputData.keyCode === ROT.KEYS.VK_RIGHT) {
                this.move(1, 0);
            }
            else if (inputData.keyCode === ROT.KEYS.VK_UP) {
                this.move(0, -1);
            }
            else if (inputData.keyCode === ROT.KEYS.VK_DOWN) {
                this.move(0, 1);
            }
        }
    };
    // TODO: Refactor into a separate class, later into a component.
    PlayScreen.prototype.move = function (dX, dY) {
        this._centerX = Math.max(0, Math.min(this._map.width - 1, this._centerX + dX));
        this._centerY = Math.max(0, Math.min(this._map.height - 1, this._centerY + dY));
    };
    return PlayScreen;
}());
exports.PlayScreen = PlayScreen;
