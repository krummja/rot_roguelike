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
const System = __importStar(require("./System"));
const Display = __importStar(require("./Display"));
const ECS = __importStar(require("./ECS"));
class Game {
    constructor() {
        this.input = new System.Input();
        this.console = new Display.Console();
        this.sceneManager = new Display.SceneManager();
        this.engine = new ECS.Engine();
        this.InputObserver = new System.Observer();
        this._physicsSystem = new ECS.PhysicsSystem();
        this._renderSystem = new ECS.RenderSystem();
    }
    initialize() {
        this.input.observable.attach(this.InputObserver);
        this.engine.addSystem(this._physicsSystem);
        this.engine.addSystem(this._renderSystem);
        this.sceneManager.switch('PLAY');
    }
    update() {
        let inputState = this.InputObserver.subjectState;
        console.log("Game.update(): " + inputState);
        this.engine.update();
    }
}
exports.Game = Game;
