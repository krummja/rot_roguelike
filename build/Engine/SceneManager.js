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
    constructor(core) {
        this._currentScene = null;
        this.CORE = core;
        this.scenes = {
            START: new Scenes.StartScene(this),
            PLAY: new Scenes.PlayScene(this)
        };
    }
    get currentScene() { return this._currentScene; }
    set currentScene(value) { this._currentScene = value; }
    /**
     * Handles input based on currently active scene.
     */
    handleInput() {
        let manager = this;
        // Return
        this.CORE.EVENTS.on('return', () => {
            if (manager.currentScene.sceneKey === 'START') {
                manager.switch('PLAY');
            }
            else {
                console.log("This key has no function!");
            }
        });
        // Numpad Directions
        // Other
    }
    /**
     * Refresh the console and trigger a console update.
     */
    refresh() {
        this.CORE.CONSOLE.display.clear();
        this._currentScene.render();
    }
    /**
     * Handles switching of scenes.
     * @param sceneKey
     */
    switch(sceneKey) {
        if (this.currentScene !== null) {
            this.currentScene.exit();
        }
        this.CORE.CONSOLE.display.clear();
        this.currentScene = this.scenes[sceneKey];
        if (this.currentScene) {
            this.currentScene.enter();
            this.refresh();
        }
    }
}
exports.SceneManager = SceneManager;
