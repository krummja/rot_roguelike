"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mob = exports.NPC = exports.Player = exports.Entity = exports.Recipient = exports.Sight = exports.Actor = void 0;
const Entities_1 = require("./Entities");
Object.defineProperty(exports, "Player", { enumerable: true, get: function () { return Entities_1.Player; } });
Object.defineProperty(exports, "NPC", { enumerable: true, get: function () { return Entities_1.NPC; } });
const Entity_1 = require("./Entity");
Object.defineProperty(exports, "Entity", { enumerable: true, get: function () { return Entity_1.Entity; } });
const Mixins_1 = require("./Mixins");
Object.defineProperty(exports, "Actor", { enumerable: true, get: function () { return Mixins_1.Actor; } });
Object.defineProperty(exports, "Recipient", { enumerable: true, get: function () { return Mixins_1.Recipient; } });
Object.defineProperty(exports, "Sight", { enumerable: true, get: function () { return Mixins_1.Sight; } });
Object.defineProperty(exports, "Mob", { enumerable: true, get: function () { return Mixins_1.Mob; } });
