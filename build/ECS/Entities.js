"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPC = exports.Player = void 0;
const ts_mixer_1 = require("ts-mixer");
const Mixins_1 = require("./Mixins");
const Entity_1 = require("./Entity");
ts_mixer_1.settings.prototypeStrategy = 'copy';
ts_mixer_1.settings.initFunction = 'init';
class Player extends ts_mixer_1.Mixin(Entity_1.Entity, Mixins_1.Sight, Mixins_1.Actor, Mixins_1.Recipient, Mixins_1.Combatant) {
}
exports.Player = Player;
class NPC extends ts_mixer_1.Mixin(Entity_1.Entity, Mixins_1.Mob, Mixins_1.Combatant) {
}
exports.NPC = NPC;
