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
        this.map = null;
        this.game = game;
    }
    PlayScreen.prototype.enter = function () {
        console.log("PlayScreen.enter:  Entered play screen.");
        this.map = [];
        for (var x = 0; x < 80; x++) {
            this.map.push([]);
            for (var y = 0; y < 40; y++) {
                this.map[x].push(_1.Tile.nullTile());
            }
        }
        this._map = _1.Map.generate(this.map);
        console.log(this._map);
    };
    PlayScreen.prototype.exit = function () {
        console.log("PlayScreen.exit:   Exited play screen.");
    };
    PlayScreen.prototype.render = function (display) {
        // TODO: Refactor this to the following:
        // for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
        // for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
        for (var x = 0; x < this._map.width; x++) {
            for (var y = 0; y < this._map.height; y++) {
                var glyph = this._map.getTile(x, y).glyph;
                display.draw(x, y, glyph.char, glyph.fg, glyph.bg);
            }
        }
    };
    PlayScreen.prototype.handleInput = function (inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.key === ROT.KEYS.VK_RETURN) {
                console.log('Enter key pressed!');
            }
        }
    };
    return PlayScreen;
}());
exports.PlayScreen = PlayScreen;
