"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageManager = void 0;
const sprintf_1 = require("sprintf");
const Game_1 = require("./Game");
class MessageManager {
    constructor(game) {
        this._game = game;
        Game_1.Game.EVENTS.on('position', () => {
            let player = this._game.currentScreen.player;
            this.sendMessage(player, 'position', "Position: %s", [player.x + "," + player.y]);
        });
        // Player Events
        Game_1.Game.EVENTS.on('player', (action, type, result) => {
            // Action: tryMove
            if (action === 'tryMove') {
                // Action Type: up
                if (type === 'up') {
                    // Success?
                    if (result === 'success') {
                        let s = 'You follow the passage upward.';
                        this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
                    }
                    // Failure?
                    else if (result === 'failure') {
                        let s = 'You can\'t ascend here!.';
                        this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
                    }
                }
                // Action Type: down
                else if (type === 'down') {
                    // Success?
                    if (result === 'success') {
                        let s = 'You follow the passage downward.';
                        this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
                    }
                    // Failure?
                    else if (result === 'failure') {
                        let s = 'You can\'t descend here!';
                        this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
                    }
                }
                // Action Type: move
                else if (type === 'move') {
                    // Success?
                    if (result === 'success') {
                        let s = ' ';
                        this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
                    }
                    // Failure?
                    else if (result === 'failure') {
                        let s = 'You can\'t move there!';
                        this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
                    }
                }
                // Action Type: dig
                else if (type === 'dig') {
                    // Success?
                    if (result === 'success') {
                        let s = 'The stone gives and crumbles at your feet!';
                        this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
                    }
                }
            }
            // End
        });
    }
    sendMessage(recipient, sender, message, args) {
        message = sprintf_1.vsprintf(message, args);
        recipient.receiveMessage(sender, message);
    }
    // Change this so that as y decreases, the text fades out
    renderMessage(x, y, sender) {
        let messages = this._game.currentScreen.player.messages[sender];
        for (let i = 0; i < messages.length; i++) {
            y += this._game.display.drawText(x, y, '%c{white}%b{black}' + messages[i]);
        }
    }
    clearMessages(buffer = 0, sender, fade = false) {
        let messages = this._game.currentScreen.player.messages[sender];
        if (messages.length > 1 + buffer) {
            messages.shift();
        }
    }
}
exports.MessageManager = MessageManager;
