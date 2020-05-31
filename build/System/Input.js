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
        this.observable = new Util_1.Subject();
        let bindEventToScreen = (event) => {
            window.addEventListener(event, (e) => {
                this.handleInput(event, e);
            });
        };
        bindEventToScreen('keydown');
    }
    handleInput(inputType, inputData) {
        this.state = null;
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
                this.state = keyCommands.return;
            }
            else if (inputData.keyCode === keyCommands.up) {
                this.state = keyCommands.up;
            }
            else if (inputData.keyCode === keyCommands.down) {
                this.state = keyCommands.down;
            }
            else if (inputData.keyCode === keyCommands.left) {
                this.state = keyCommands.left;
            }
            else if (inputData.keyCode === keyCommands.right) {
                this.state = keyCommands.right;
            }
            else if (inputData.keyCode === keyCommands.upleft) {
                this.state = keyCommands.upleft;
            }
            else if (inputData.keyCode === keyCommands.upright) {
                this.state = keyCommands.upright;
            }
            else if (inputData.keyCode === keyCommands.downleft) {
                this.state = keyCommands.downleft;
            }
            else if (inputData.keyCode === keyCommands.downright) {
                this.state = keyCommands.downright;
            }
            console.log("Input State: " + this.state);
            this.observable.notify(this.state);
        }
    }
}
exports.Input = Input;
