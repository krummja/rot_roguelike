"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageManager = void 0;
const sprintf_1 = require("sprintf");
const Game_1 = require("./Game");
class MessageManager {
    constructor(game) {
        this._game = game;
        this._EVENTS = Game_1.Game.EVENTS;
        this._EVENTS.on('position', () => {
            let player = this._game.currentScreen.player;
            this.sendMessage(player, 'position', "Position: %s", [player.x + "," + player.y]);
        });
        this._EVENTS.on('tryMove', (s) => {
            this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
        });
    }
    sendMessage(recipient, sender, message, args) {
        message = sprintf_1.vsprintf(message, args);
        recipient.receiveMessage(sender, message);
    }
    // Change this so that as y decreases, the text fades out
    renderMessage(x, y, sender, direction = 'down') {
        let messages = this._game.currentScreen.player.messages[sender];
        for (let i = 0; i < messages.length; i++) {
            if (direction === 'up') {
                y -= this._game.display.drawText(x, y, '%c{white}%b{black}' + messages[i]);
            }
            else if (direction === 'down') {
                y += this._game.display.drawText(x, y, '%c{white}%b{black}' + messages[i]);
                console.log(y);
            }
        }
    }
    clearMessages(buffer = 0, sender) {
        let messages = this._game.currentScreen.player.messages[sender];
        if (messages.length >= 2 + buffer) {
            messages.shift();
        }
    }
}
exports.MessageManager = MessageManager;
