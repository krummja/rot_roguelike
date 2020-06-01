"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayScene = exports.StartScene = void 0;
class StartScene {
    constructor(manager) {
        this.mapWidth = 200;
        this.mapHeight = 200;
        this._manager = manager;
    }
    enter() {
        console.log("Start Scene entered.");
    }
    exit() {
        console.log(" Exiting Start Scene.");
    }
    render() {
        let console = this._manager.console;
        console.display.drawText(1, 1, "%c{yellow}TypeScript Roguelike");
        console.display.drawText(1, 2, "Press [Enter] to start!");
    }
}
exports.StartScene = StartScene;
class PlayScene {
    constructor(manager) {
        this._manager = manager;
    }
    enter() {
    }
    exit() {
    }
    render() {
        let console = this._manager.console;
    }
}
exports.PlayScene = PlayScene;
