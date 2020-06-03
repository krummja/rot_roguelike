"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayScene = exports.StartScene = void 0;
const Components_1 = require("../ECS/Components");
class StartScene {
    constructor(manager) {
        this.mapWidth = 200;
        this.mapHeight = 200;
        this.sceneKey = 'START';
        this._manager = manager;
        this._events = this._manager.CORE.EVENTS;
        this._console = this._manager.CORE.CONSOLE;
    }
    enter() {
        console.log("Start Scene entered.");
    }
    exit() {
        console.log(" Exiting Start Scene.");
    }
    render() {
        this._console.display.drawText(1, 1, "%c{yellow}TypeScript Roguelike");
        this._console.display.drawText(1, 2, "Press [Enter] to start!");
    }
}
exports.StartScene = StartScene;
class PlayScene {
    constructor(manager) {
        this.sceneKey = 'PLAY';
        this._manager = manager;
        this._events = this._manager.CORE.EVENTS;
        this._console = this._manager.CORE.CONSOLE;
    }
    enter() {
        console.log("Starting ROT Engine");
        this._manager.CORE.ROT_ENGINE.start();
        console.log("Adding Player to ECS Engine.");
        this._manager.CORE.ECS_ENGINE.newEntity("Player");
        let entities = this._manager.CORE.ECS_ENGINE.entities;
        for (let entity of entities) {
            entity.putComponent(Components_1.PositionComponent);
            entity.putComponent(Components_1.RenderComponent);
            console.log(entity);
        }
        console.log("Saturating entities.");
        this._manager.CORE.ECS_ENGINE.update();
        console.log(this._manager.CORE.ECS_ENGINE);
    }
    exit() {
    }
    render() {
        let screenWidth = this._console.width;
        let screenHeight = this._console.height;
        // // Figure out the viewport dimensions
        // let topLeftX = Math.max(0, this._player.x - (screenWidth / 2));
        // topLeftX = Math.min(topLeftX, this.map.width - screenWidth);
        // let topLeftY = Math.max(0, this._player.y - (screenHeight / 2));
        // topLeftY = Math.min(topLeftY, this.map.height - screenHeight);
    }
}
exports.PlayScene = PlayScene;
