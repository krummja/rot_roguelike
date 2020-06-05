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
const _1 = require("./");
class StartScreen {
    constructor(game) {
        this.game = game;
    }
    enter() {
        console.log("StartScreen.enter: Entered start screen.");
    }
    exit() {
        console.log("StartScreen.exit:  Exited start screen.");
    }
    render(display) {
        display.drawText(1, 1, "%c{yellow}TypeScript Roguelike");
        display.drawText(1, 2, "Press [Enter] to start!");
        display.drawText(1, 4, "Use Numpad Arrows (2, 4, 6, 8) to Navigate.");
        display.drawText(1, 5, "Use Numpad 7 to Ascend, Numpad 1 to Descend.");
    }
    handleInput(inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
                let play = new _1.PlayScreen(this.game);
                this.game.switchScreen(play);
            }
        }
    }
}
exports.StartScreen = StartScreen;
