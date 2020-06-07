"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const ts_mixer_1 = require("ts-mixer");
const Entity_1 = require("./Entity");
const Mixins_1 = require("./Mixins");
ts_mixer_1.settings.prototypeStrategy = 'copy';
ts_mixer_1.settings.initFunction = 'init';
class Player extends ts_mixer_1.Mixin(Entity_1.Entity, Mixins_1.Combatant, Mixins_1.Controllable, Mixins_1.PlayerActor, Mixins_1.Recipient, Mixins_1.Sight) {
}
exports.Player = Player;
