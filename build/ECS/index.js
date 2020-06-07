"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WanderActor = exports.Sight = exports.Recipient = exports.PlayerActor = exports.Player = exports.Moveable = exports.Entity = exports.Combatant = void 0;
const Entity_1 = require("./Entity");
Object.defineProperty(exports, "Entity", { enumerable: true, get: function () { return Entity_1.Entity; } });
const Player_1 = require("./Player");
Object.defineProperty(exports, "Player", { enumerable: true, get: function () { return Player_1.Player; } });
const Mixins_1 = require("./Mixins");
Object.defineProperty(exports, "Combatant", { enumerable: true, get: function () { return Mixins_1.Combatant; } });
Object.defineProperty(exports, "Moveable", { enumerable: true, get: function () { return 
    // Controllable,
    Mixins_1.Moveable; } });
Object.defineProperty(exports, "PlayerActor", { enumerable: true, get: function () { return Mixins_1.PlayerActor; } });
Object.defineProperty(exports, "Recipient", { enumerable: true, get: function () { return Mixins_1.Recipient; } });
Object.defineProperty(exports, "Sight", { enumerable: true, get: function () { return Mixins_1.Sight; } });
Object.defineProperty(exports, "WanderActor", { enumerable: true, get: function () { return Mixins_1.WanderActor; } });
