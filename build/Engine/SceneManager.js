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
exports.SceneManager = void 0;
const Scenes = __importStar(require("./Scenes"));
class SceneManager {
    constructor(console) {
        this._currentScene = null;
        this._CONSOLE = console;
        this.scenes = {
            START: new Scenes.StartScene(this),
            PLAY: new Scenes.PlayScene(this)
        };
    }
    get console() { return this._CONSOLE; }
    get currentScene() { return this._currentScene; }
    set currentScene(value) { this._currentScene = value; }
    refresh() {
        this.console.display.clear();
        this._currentScene.render();
    }
    switch(sceneKey) {
        if (this._currentScene !== null) {
            this._currentScene.exit();
        }
        this._currentScene = this.scenes[sceneKey];
        this._currentScene.enter();
        this.refresh();
    }
}
exports.SceneManager = SceneManager;
