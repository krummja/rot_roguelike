"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./game");
const Display_1 = require("./Display");
window.onload = () => {
    let game = new game_1.Game();
    let startScreen = new Display_1.StartScreen(game);
    game.init();
    game.switchScreen(startScreen);
};
