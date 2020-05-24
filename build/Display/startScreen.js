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
var ROT = __importStar(require("rot-js"));
var _1 = require("./");
var StartScreen = /** @class */ (function () {
    function StartScreen(game) {
        this.game = game;
        // super(game);
    }
    StartScreen.prototype.enter = function () {
        console.log("StartScreen.enter: Entered start screen.");
    };
    StartScreen.prototype.exit = function () {
        console.log("StartScreen.exit:  Exited start screen.");
    };
    StartScreen.prototype.render = function (display) {
        display.drawText(1, 1, "%c{yellow}TypeScript Roguelike");
        display.drawText(1, 2, "Press [Enter] to start!");
    };
    StartScreen.prototype.handleInput = function (inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
                var screen_1 = new _1.PlayScreen(this.game);
                this.game.switchScreen(screen_1);
            }
        }
    };
    return StartScreen;
}());
exports.StartScreen = StartScreen;
