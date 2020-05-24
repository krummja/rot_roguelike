"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("./game");
var Display_1 = require("./Display");
window.onload = function () {
    var game = new game_1.Game();
    var startScreen = new Display_1.StartScreen(game);
    game.init();
    game.switchScreen(startScreen);
};
