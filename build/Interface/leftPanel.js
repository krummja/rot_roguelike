"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeftPanel = void 0;
class LeftPanel {
    constructor(game) {
        this._game = game;
        this._container = document.getElementById("left-panel");
        let textBox = document.createElement("span");
        let text = document.createTextNode("Position: " + "... placeholder");
        textBox.appendChild(text);
        this._container.appendChild(textBox);
    }
}
exports.LeftPanel = LeftPanel;
