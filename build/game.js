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
exports.Game = void 0;
var ROT = __importStar(require("rot-js"));
var utils_1 = require("./utils");
var Game = /** @class */ (function () {
    function Game() {
        var _a;
        this._display = null;
        this._currentScreen = null;
        this._screenWidth = 64;
        this._screenHeight = 40;
        this._fontFamily = 'Fira Code';
        this._fontStyle = 'normal';
        this._fontSize = 12;
        this._spacing = 1.0;
        this._squareRatio = true;
        this.display = new ROT.Display({
            width: this._screenWidth,
            height: this._screenHeight,
            fontFamily: this._fontFamily,
            fontStyle: this._fontStyle,
            spacing: this._spacing,
            forceSquareRatio: this._squareRatio
        });
        this.container = this.display.getContainer();
        (_a = document.getElementById('game')) === null || _a === void 0 ? void 0 : _a.appendChild(this.container);
    }
    Object.defineProperty(Game.prototype, "display", {
        get: function () { return this._display; },
        set: function (v) { this._display = v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "currentScreen", {
        get: function () { return this._currentScreen; },
        set: function (v) { this._currentScreen = v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "screenWidth", {
        get: function () { return this._screenWidth; },
        set: function (v) { this._screenWidth = v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "screenHeight", {
        get: function () { return this._screenHeight; },
        set: function (v) { this._screenHeight = v; },
        enumerable: false,
        configurable: true
    });
    Game.prototype.init = function () {
        var game = this;
        var bindEventToScreen = function (event) {
            window.addEventListener(event, function (e) {
                if (game.currentScreen !== null) {
                    game.currentScreen.handleInput(event, e);
                }
            });
        };
        bindEventToScreen('keydown');
        bindEventToScreen('keypress');
    };
    Game.prototype.refresh = function () {
        this._display.clear();
        this._currentScreen.render((this._display));
    };
    Game.prototype.switchScreen = function (screen) {
        if (this.currentScreen !== null) {
            this.currentScreen.exit();
        }
        this.display.clear();
        this.currentScreen = screen;
        if (this.currentScreen) {
            this.currentScreen.enter();
            this.refresh();
        }
    };
    Game.getNeighborPositions = function (x, y) {
        var tiles = [];
        for (var dX = -1; dX < 2; dX++) {
            for (var dY = -1; dY < 2; dY++) {
                if (dX == 0 && dY == 0) {
                    continue;
                }
                tiles.push({ x: x + dX, y: y + dY });
            }
        }
        return utils_1.shuffleCoordArray(tiles);
    };
    return Game;
}());
exports.Game = Game;
