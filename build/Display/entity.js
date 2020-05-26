"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = exports.Mob = exports.Player = exports.Entity = void 0;
var ts_mixer_1 = require("ts-mixer");
var _1 = require("./");
ts_mixer_1.settings.prototypeStrategy = 'copy';
ts_mixer_1.settings.initFunction = 'init';
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity(properties) {
        var _this = _super.call(this, properties) || this;
        _this._name = properties['name'] || ' ';
        _this._x = properties['x'] || 0;
        _this._y = properties['y'] || 0;
        _this._z = properties['z'] || 0;
        _this.map = null;
        return _this;
    }
    Object.defineProperty(Entity.prototype, "name", {
        // I think the movement system is changing the Entity base class's x,y,z values...
        get: function () { return this._name; },
        set: function (v) { this._name = v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "x", {
        get: function () { return this._x; },
        set: function (v) { this._x = v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "y", {
        get: function () { return this._y; },
        set: function (v) { this._y = v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "z", {
        get: function () { return this._z; },
        set: function (v) { this._z = v; },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.setPosition = function (x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
    };
    return Entity;
}(_1.Glyph));
exports.Entity = Entity;
var HitCounter = /** @class */ (function () {
    function HitCounter(properties) {
        var _this = this;
        this._multiplier = properties["multiplier"];
        this._totalHits = 0;
        this.incrementHit = function () { _this._totalHits += _this._multiplier; };
        this.getTotalHits = function () { return _this._totalHits; };
    }
    return HitCounter;
}());
var Combatant = /** @class */ (function (_super) {
    __extends(Combatant, _super);
    function Combatant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Combatant;
}(ts_mixer_1.Mixin(Entity, HitCounter)));
var Moveable = /** @class */ (function () {
    function Moveable(properties) {
        this.properties = properties;
        this.x = this.properties['x'];
        this.y = this.properties['y'];
        this.z = this.properties['z'];
    }
    Moveable.prototype.init = function (properties) {
        var _this = this;
        this.tryMove = function (x, y, z, map) {
            var tile = map.getTile(x, y, _this.z);
            if (z < _this.z) {
                if (tile.traverseable === false) {
                    console.log("You can't ascend here!");
                }
                else {
                    _this.x = x;
                    _this.y = y;
                    _this.z = z;
                }
            }
            else if (z > _this.z) {
                if (tile.traverseable === false) {
                    console.log("You can't descend here!");
                }
                else {
                    _this.x = x;
                    _this.y = y;
                    _this.z = z;
                }
            }
            if (tile.walkable) {
                _this.x = x;
                _this.y = y;
                _this.z = z;
                return true;
            }
            else if (tile.diggable) {
                map.dig(x, y, z);
                return true;
            }
            return false;
        };
        this.getBgTint = function (x, y, z, map) {
            var tile = map.getTile(x, y, z);
            return tile.bg;
        };
    };
    return Moveable;
}());
var Sight = /** @class */ (function () {
    function Sight(properties) {
        this.properties = properties;
        this._sightRadius = properties['sightRadius'];
    }
    Object.defineProperty(Sight.prototype, "sightRadius", {
        get: function () { return this._sightRadius; },
        set: function (value) { this._sightRadius = value; },
        enumerable: false,
        configurable: true
    });
    Sight.prototype.init = function (properties) {
        this._sightRadius = properties['sightRadius'] || 5;
    };
    return Sight;
}());
var Actor = /** @class */ (function () {
    function Actor(properties, game, map) {
        this.properties = properties;
        this.game = game;
        this.map = map;
    }
    Actor.prototype.init = function (properties) {
        var _this = this;
        this.act = function () {
            _this.game.refresh();
            _this.map.engine.lock();
        };
    };
    return Actor;
}());
exports.Actor = Actor;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Player;
}(ts_mixer_1.Mixin(Entity, Moveable, Sight, Actor)));
exports.Player = Player;
var Mob = /** @class */ (function (_super) {
    __extends(Mob, _super);
    function Mob() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Mob;
}(ts_mixer_1.Mixin(Entity, Moveable, Actor)));
exports.Mob = Mob;
