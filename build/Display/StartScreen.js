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
exports.StartScreen = void 0;
const ROT = __importStar(require("rot-js"));
const Game_1 = require("../Game");
const _1 = require("./");
class StartScreen {
    constructor(game) {
        this.key = "START";
        this.game = game;
        this._EVENTS = Game_1.Game.EVENTS;
    }
    enter() {
        this._EVENTS.emit('ready');
    }
    exit() {
        this.game.display.drawText(1, 20, "Loading...");
    }
    render(display) {
        display.drawText(1, 1, "%c{yellow}TypeScript Roguelike");
        display.drawText(1, 2, "Press [Enter] to start!");
        display.drawText(1, 4, "Numpad Controls:");
        display.drawText(1, 6, "----- ----- -----");
        display.drawText(1, 7, "|7  | |8  | |9  |");
        display.drawText(1, 8, "| %c{red}UP%c{}| |  %c{red}N%c{}| |   |");
        display.drawText(1, 9, "----- ----- -----");
        display.drawText(1, 10, "----- ----- -----");
        display.drawText(1, 11, "|4  | |5  | |6  |");
        display.drawText(1, 12, "|  %c{red}W%c{}| |   | |  %c{red}E%c{}|");
        display.drawText(1, 13, "----- ----- -----");
        display.drawText(1, 14, "----- ----- -----");
        display.drawText(1, 15, "|1  | |2  | |3  |");
        display.drawText(1, 16, "| %c{red}DN%c{}| |  %c{red}S%c{}| |   |");
        display.drawText(1, 17, "----- ----- -----");
    }
    handleInput(inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
                this.game.display.drawText(1, 20, "Loading...");
                let start = this;
                setTimeout(() => {
                    let play = new _1.PlayScreen(start.game);
                    start.game.switchScreen(play);
                }, 3000);
            }
        }
    }
}
exports.StartScreen = StartScreen;
