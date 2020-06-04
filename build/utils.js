"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENTS = exports.shuffleCoordArray = void 0;
const events_1 = require("events");
function shuffleCoordArray(array) {
    let shuffled;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        shuffled = [array[i], array[j]] = [array[j], array[i]];
    }
    return shuffled;
}
exports.shuffleCoordArray = shuffleCoordArray;
const EVENTS = new events_1.EventEmitter();
exports.EVENTS = EVENTS;
