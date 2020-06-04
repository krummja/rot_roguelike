"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingScreen = void 0;
const _1 = require(".");
const builder_1 = require("../builder");
const utils_1 = require("../utils");
class LoadingScreen {
    constructor(game) {
        this.mapWidth = 200;
        this.mapHeight = 100;
        this.game = game;
    }
    enter() {
        let width = this.mapWidth;
        let height = this.mapHeight;
        let depth = 3;
        let ratio = 0.70;
        let iterations = 100;
        let tilesFilled = 50;
        this.builder = new builder_1.Builder(width, height, depth, ratio, iterations, tilesFilled).tiles;
    }
    exit() {
    }
    render(display) {
        display.drawText(1, 1, "L O A D I N G . . . ");
        let play = new _1.PlayScreen(this.game, this.builder);
        let callback = () => { this.game.switchScreen(play); };
        utils_1.EVENTS.on('done', callback);
    }
    handleInput() {
    }
}
exports.LoadingScreen = LoadingScreen;
