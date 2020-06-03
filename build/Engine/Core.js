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
exports.Core = void 0;
// External Libraries
const events_1 = require("events");
const ROT = __importStar(require("rot-js"));
const Controller = __importStar(require("../Controller"));
const Display = __importStar(require("../Display"));
// Engine-Internal Modules
const ECS = __importStar(require("./ECS"));
// Engine Components
const SceneManager_1 = require("./SceneManager");
class Core {
    constructor() {
        this.EVENTS = new events_1.EventEmitter();
        this._CONSOLE = new Display.Console(this);
        this._INPUT = new Controller.Input(this);
        this._SCENE_MANAGER = new SceneManager_1.SceneManager(this);
        // ECS Engine will be called somewhere in here.
        this._SCHEDULER = new ROT.Scheduler.Simple();
        this._ROT_ENGINE = new ROT.Engine(this._SCHEDULER);
        this._ECS_ENGINE = new ECS.Engine();
        this._POSITION_SYSTEM = new ECS.PositionSystem();
        this._RENDER_SYSTEM = new ECS.RenderSystem();
    }
    get CONSOLE() { return this._CONSOLE; }
    get INPUT() { return this._INPUT; }
    get ROT_ENGINE() { return this._ROT_ENGINE; }
    get ECS_ENGINE() { return this._ECS_ENGINE; }
    get POSITION_SYSTEM() { return this._POSITION_SYSTEM; }
    get RENDER_SYSTEM() { return this._RENDER_SYSTEM; }
    /**
     * Get the business end pointed the right way
     */
    initialize() {
        // Set up entities and initialize systems.
        this._INPUT.initialize();
        // Start up ECS Engine and Systems
        this._ECS_ENGINE.addSystem(this._POSITION_SYSTEM);
        this._ECS_ENGINE.addSystem(this._RENDER_SYSTEM);
        // Bootstrap the scene switcher.
        this._SCENE_MANAGER.switch('START');
        // Pass control to the manager.
        this._SCENE_MANAGER.handleInput();
    }
}
exports.Core = Core;
