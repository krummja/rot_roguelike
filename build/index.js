"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Display_1 = require("./Display");
const Game_1 = require("./Game");
const Interface_1 = require("./Interface");
window.onload = () => {
    let game = new Game_1.Game();
    let startScreen = new Display_1.StartScreen(game);
    let gameInterface = new Interface_1.Interface(game);
    game.init();
    game.switchScreen(startScreen);
};
