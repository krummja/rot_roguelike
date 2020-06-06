"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mob = exports.Player = exports.batTemplate = exports.playerTemplate = void 0;
const ts_mixer_1 = require("ts-mixer");
const Entity_1 = require("./Entity");
const Mixins_1 = require("./Mixins");
ts_mixer_1.settings.prototypeStrategy = 'copy';
ts_mixer_1.settings.initFunction = 'init';
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
class Player extends ts_mixer_1.Mixin(Entity_1.Entity, Mixins_1.Combatant, Mixins_1.PlayerActor, Mixins_1.Recipient, Mixins_1.Sight) {
}
exports.Player = Player;
class Mob extends ts_mixer_1.Mixin(Entity_1.Entity, Mixins_1.Combatant, Mixins_1.MobActor) {
}
exports.Mob = Mob;
