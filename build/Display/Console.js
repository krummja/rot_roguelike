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
const _1 = require("./");
class Console {
    constructor() {
        var _a;
        this._display = null;
        this._renderer = null;
        this._display = new ROT.Display({
            width: 64,
            height: 40,
            fontFamily: 'Fira Code',
            fontStyle: 'normal',
            spacing: 1.0,
            forceSquareRatio: true
        });
        this.container = this._display.getContainer();
        (_a = document.getElementById('game')) === null || _a === void 0 ? void 0 : _a.appendChild(this.container);
        this._renderer = new _1.Renderer();
        var foreground, background, colors;
        for (let i = 0; i < 15; i++) {
            foreground = ROT.Color.toRGB([255 - (i * 20), 255 - (i * 20), 255 - (i * 20)]);
            background = ROT.Color.toRGB([i * 20, i * 20, i * 20]);
            colors = "%c{" + foreground + "}%b{" + background + "}";
            this._display.drawText(2, i, colors + "Hello World!");
        }
    }
    get display() { return this._display; }
    get renderer() { return this._renderer; }
}
exports.Console = Console;
