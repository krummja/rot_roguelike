"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batTemplate = exports.playerTemplate = void 0;
exports.playerTemplate = {
    character: '@',
    name: 'Player',
    foreground: [228, 79, 163],
    background: [0, 0, 0] || null,
    sightRadius: 20,
};
exports.batTemplate = {
    character: 'w',
    name: 'Bat',
    foreground: [255, 255, 74],
    background: [0, 0, 0] || null,
};
