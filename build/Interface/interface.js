"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interface = void 0;
const leftPanel_1 = require("./leftPanel");
class Interface {
    constructor(game) {
        this._game = game;
        this.leftPanel = new leftPanel_1.LeftPanel(this._game);
    }
}
exports.Interface = Interface;
