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
exports.Console = void 0;
const ROT = __importStar(require("rot-js"));
class Console {
    constructor() {
        var _a;
        this._display = null;
        this._consoleConfig = {
            width: 64,
            height: 40,
            fontFamily: 'Fira Code',
            fontStyle: 'normal',
            spacing: 1.0,
            forceSquareRatio: true
        };
        this._display = new ROT.Display({
            width: this._consoleConfig['width'],
            height: this._consoleConfig['height'],
            fontFamily: this._consoleConfig['fontFamily'],
            fontStyle: this._consoleConfig['fontStyle'],
            spacing: this._consoleConfig['spacing'],
            forceSquareRatio: this._consoleConfig['forceSquareRatio']
        });
        this.container = this._display.getContainer();
        (_a = document.getElementById('game')) === null || _a === void 0 ? void 0 : _a.appendChild(this.container);
    }
    get display() { return this._display; }
    clear() {
    }
    render() {
        let screenWidth = this._consoleConfig['width'];
        let screenHeight = this._consoleConfig['height'];
        this._display.drawText(20, 20, 'Hello world!');
    }
}
exports.Console = Console;
