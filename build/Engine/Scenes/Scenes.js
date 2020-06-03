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
exports.PlayScene = exports.StartScene = void 0;
const Generators = __importStar(require("../Generators"));
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
        this._height = 200;
        this._width = 200;
        this.sceneKey = 'PLAY';
        this._manager = manager;
        this._events = this._manager.CORE.EVENTS;
        this._console = this._manager.CORE.CONSOLE;
        this._builder = new Generators.Builder(this._width, this._height);
        let tileArray = this._builder.generateTileArray();
        this._currentMap = this._builder.generateArea(tileArray);
    }
    enter() {
        console.log("Play Scene Entered.");
        console.log("");
        console.log("Starting ROT Engine");
        this._manager.CORE.ROT_ENGINE.start();
        console.log("Adding Player to ECS Engine.");
        this._manager.CORE.ECS_ENGINE.newEntity("Player", "PLAYER");
        // Set up components.
        console.log("Generating components.");
        let entities = this._manager.CORE.ECS_ENGINE.entities;
        for (let entity of entities) {
            entity.putComponent(Components_1.ActorComponent);
            entity.putComponent(Components_1.PositionComponent);
            entity.putComponent(Components_1.RenderComponent);
            console.log(entity);
        }
        // Update all systems.
        console.log("Saturating entities.");
        this._manager.CORE.ECS_ENGINE.update();
    }
    exit() {
    }
    render() {
        let screenWidth = this._console.width;
        let screenHeight = this._console.height;
        // // Figure out the viewport dimensions
        let topLeftX = Math.max(0, 100 - (screenWidth / 2));
        topLeftX = Math.min(topLeftX, this._width - screenWidth);
        let topLeftY = Math.max(0, 100 - (screenHeight / 2));
        topLeftY = Math.min(topLeftY, this._height - screenHeight);
        for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
            for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
                let tile = this._builder.getTile(x, y);
                this._console.display.draw(x - topLeftX, y - topLeftY, tile.glyph.character, tile.glyph.foreground, tile.glyph.background);
            }
        }
    }
}
exports.PlayScene = PlayScene;
