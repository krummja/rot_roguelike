"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneManager = void 0;
class SceneManager {
    constructor(game) {
        this._game = game;
    }
    get game() { return this._game; }
    switch(scene) {
        if (this._game.currentScene !== null) {
            this._game.currentScene.exit();
        }
        this._game.console.renderer.clear();
        this._game.currentScene = scene;
        if (this._game.currentScene) {
            this._game.currentScene.enter();
            this._game.console.renderer.refresh();
        }
    }
}
exports.SceneManager = SceneManager;
