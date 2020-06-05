"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interface = void 0;
const LeftPanel_1 = require("./LeftPanel");
class Interface {
    constructor(game) {
        this._game = game;
        this.leftPanel = new LeftPanel_1.LeftPanel(this._game);
    }
}
exports.Interface = Interface;
