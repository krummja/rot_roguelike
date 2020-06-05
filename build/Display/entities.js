"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const ts_mixer_1 = require("ts-mixer");
const mixins_1 = require("./mixins");
ts_mixer_1.settings.prototypeStrategy = 'copy';
ts_mixer_1.settings.initFunction = 'init';
class Player extends ts_mixer_1.Mixin(mixins_1.Entity, mixins_1.Moveable, mixins_1.Sight, mixins_1.Actor, mixins_1.Recipient) {
}
exports.Player = Player;
