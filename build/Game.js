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
const ROT = __importStar(require("rot-js"));
const events_1 = require("events");
const MessageManager_1 = require("./MessageManager");
let Game = /** @class */ (() => {
    class Game {
        constructor() {
            var _a;
            this._display = null;
            this._currentScreen = null;
            this._screenWidth = 100;
            this._screenHeight = 60;
            this._fontFamily = 'Fira Code';
            this._fontStyle = 'normal';
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
            this.messageManager = new MessageManager_1.MessageManager(this);
        }
        get display() { return this._display; }
        set display(v) { this._display = v; }
        get currentScreen() { return this._currentScreen; }
        set currentScreen(v) { this._currentScreen = v; }
        get screenWidth() { return this._screenWidth; }
        set screenWidth(v) { this._screenWidth = v; }
        get screenHeight() { return this._screenHeight; }
        set screenHeight(v) { this._screenHeight = v; }
        init() {
            let game = this;
            let bindEventToScreen = (event) => {
                window.addEventListener(event, (e) => {
                    if (game.currentScreen !== null) {
                        game.currentScreen.handleInput(event, e);
                    }
                });
            };
            bindEventToScreen('keydown');
            bindEventToScreen('keypress');
        }
        refresh() {
            this._display.clear();
            this._currentScreen.render((this._display));
        }
        switchScreen(screen) {
            if (this._currentScreen !== null) {
                this._currentScreen.exit();
            }
            this._display.clear();
            this._currentScreen = screen;
            if (this._currentScreen) {
                this._currentScreen.enter();
                this.refresh();
            }
        }
    }
    Game.EVENTS = new events_1.EventEmitter();
    return Game;
})();
exports.Game = Game;
