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
var Game = /** @class */ (function () {
    function Game() {
        var _a;
        this._display = null;
        this._currentScreen = null;
        this._screenWidth = 80;
        this._screenHeight = 40;
        console.log('Game:              Setting up game instance. One sec...');
        this.display = new ROT.Display({ width: this._screenWidth, height: this._screenHeight });
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
                    game.display.clear();
                    game.currentScreen.render(game.display);
                }
            });
        };
        bindEventToScreen('keydown');
        // bindEventToScreen('keyup');
        // bindEventToScreen('keypress');
        console.log('Game.init:         Game successfully initialized on port 8080.');
    };
    Game.prototype.switchScreen = function (screen) {
        if (this.currentScreen !== null) {
            console.log('Game.switchScreen: A scene is running. Exiting first...');
            this.currentScreen.exit();
            console.log('Game.switchScreen: OK, continuing.');
        }
        this.display.clear();
        this.currentScreen = screen;
        if (this.currentScreen) {
            console.log('Game.switchScreen: Either no prior screen, or first init.');
            this.currentScreen.enter();
            console.log('Game.switchScreen: Starting renderer.');
            this.currentScreen.render(this.display);
        }
    };
    return Game;
}());
exports.Game = Game;
