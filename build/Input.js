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
const Util_1 = require("./Util");
class Input {
    constructor() {
        this.subject = new Util_1.Subject();
        let bindEventToScreen = (event) => {
            window.addEventListener(event, (e) => {
                this.handleInput(event, e);
            });
        };
        bindEventToScreen('keydown');
    }
    handleInput(inputType, inputData) {
        let inputState = null;
        let keyCommands = {
            return: ROT.KEYS.VK_RETURN,
            up: ROT.KEYS.VK_NUMPAD8,
            down: ROT.KEYS.VK_NUMPAD2,
            left: ROT.KEYS.VK_NUMPAD4,
            right: ROT.KEYS.VK_NUMPAD6,
            upleft: ROT.KEYS.VK_NUMPAD7,
            upright: ROT.KEYS.VK_NUMPAD9,
            downleft: ROT.KEYS.VK_NUMPAD1,
            downright: ROT.KEYS.VK_NUMPAD3
        };
        if (inputType === 'keydown') {
            if (inputData.keyCode === keyCommands.return) {
                inputState = keyCommands.return;
            }
            else if (inputData.keyCode === keyCommands.up) {
                inputState = keyCommands.up;
            }
            else if (inputData.keyCode === keyCommands.down) {
                inputState = keyCommands.down;
            }
            else if (inputData.keyCode === keyCommands.left) {
                inputState = keyCommands.left;
            }
            else if (inputData.keyCode === keyCommands.right) {
                inputState = keyCommands.right;
            }
            else if (inputData.keyCode === keyCommands.upleft) {
                inputState = keyCommands.upleft;
            }
            else if (inputData.keyCode === keyCommands.upright) {
                inputState = keyCommands.upright;
            }
            else if (inputData.keyCode === keyCommands.downleft) {
                inputState = keyCommands.downleft;
            }
            else if (inputData.keyCode === keyCommands.downright) {
                inputState = keyCommands.downright;
            }
            this.subject.notify();
        }
    }
}
exports.Input = Input;
