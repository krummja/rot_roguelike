"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneManager = void 0;
const _1 = require("./");
class SceneManager {
    constructor() {
        this._currentScene = null;
        this.scenes = {
            START: new _1.StartScene(),
            PLAY: new _1.PlayScene()
        };
    }
    get currentScene() { return this._currentScene; }
    set currentScene(value) { this._currentScene = value; }
    switch(sceneKey) {
        if (this._currentScene !== null) {
            this._currentScene.exit();
        }
        this._currentScene = this.scenes[sceneKey];
        this._currentScene.enter();
    }
}
exports.SceneManager = SceneManager;
