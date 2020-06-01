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
const ROT = __importStar(require("rot-js"));
// Engine-External Modules
const Controller = __importStar(require("../Controller"));
const Display = __importStar(require("../Display"));
// Engine Components
const SceneManager_1 = require("./SceneManager");
class Core {
    constructor() {
        this._CONSOLE = new Display.Console(this);
        this._INPUT = new Controller.Input(this);
        this._SCENE_MANAGER = new SceneManager_1.SceneManager(this._CONSOLE);
        // ECS Engine will be called somewhere in here.
        this._SCHEDULER = new ROT.Scheduler.Simple();
        this._ROT_ENGINE = new ROT.Engine(this._SCHEDULER);
    }
    get Console() { return this._CONSOLE; }
    initialize() {
        this._SCENE_MANAGER.switch('START');
    }
}
exports.Core = Core;
