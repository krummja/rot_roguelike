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
exports.Game = void 0;
const Display = __importStar(require("./Display/"));
const ECS = __importStar(require("./ECS/"));
const Input_1 = require("./Input");
const Display_1 = require("./Display/");
/**
 * The 'Game' class is the root class that brings together the various modules that
 * make up the game itself.
 *
 * Each module is self-contained and coordinate information largely through an Observer.
 */
class Game {
    constructor() {
        this._currentScene = null;
        // Display
        this.console = new Display.Console();
        this.sceneManager = new Display.SceneManager(this);
        // ECS Library
        this.engine = new ECS.Engine();
        // System
        this.input = new Input_1.Input();
    }
    get currentScene() { return this._currentScene; }
    set currentScene(value) { this._currentScene = value; }
    initialize() {
        let playScene = new Display_1.PlayScene();
        this.sceneManager.switch(playScene);
    }
}
exports.Game = Game;
