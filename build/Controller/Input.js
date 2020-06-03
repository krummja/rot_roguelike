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
exports.Input = void 0;
const ROT = __importStar(require("rot-js"));
class Input {
    constructor(core) {
        this._CORE = core;
    }
    initialize() {
        let bindEventToScreen = (event) => {
            window.addEventListener(event, (e) => {
                this.handleInput(event, e);
            });
        };
        bindEventToScreen('keydown');
    }
    handleInput(inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
                this._CORE.EVENTS.emit('return');
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD8) {
                this._CORE.EVENTS.emit('up');
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD2) {
                this._CORE.EVENTS.emit('down');
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD4) {
                this._CORE.EVENTS.emit('left');
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD6) {
                this._CORE.EVENTS.emit('right');
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD7) {
                this._CORE.EVENTS.emit('upleft');
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD9) {
                this._CORE.EVENTS.emit('upright');
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD1) {
                this._CORE.EVENTS.emit('downleft');
            }
            else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD3) {
                this._CORE.EVENTS.emit('downright');
            }
        }
    }
}
exports.Input = Input;
