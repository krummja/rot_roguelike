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
var ts_mixer_1 = require("ts-mixer");
ts_mixer_1.settings.initFunction = 'init';
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.init = function () {
        Person.allPeople.add(this);
    };
    Person.allPeople = new Set();
    return Person;
}());
// Define a class that can make use of any/all of the expected type options.
var PoliticalParticipant = /** @class */ (function () {
    // The constructor will accept elements from that type.
    function PoliticalParticipant(party) {
        this.party = party;
    }
    // Method `init` deals with the possible type solutions.
    PoliticalParticipant.prototype.init = function (party) {
        if (party === 'democrat') {
            PoliticalParticipant.democrats.add(this);
        }
        else {
            PoliticalParticipant.republicans.add(this);
        }
    };
    // Make a set for each option.
    PoliticalParticipant.democrats = new Set();
    PoliticalParticipant.republicans = new Set();
    return PoliticalParticipant;
}());
// The mixin happens when we combine the first class with the second, adding properties from the former to the latter.
var Voter = /** @class */ (function (_super) {
    __extends(Voter, _super);
    function Voter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Voter;
}(ts_mixer_1.Mixin(Person, PoliticalParticipant)));
var v1 = new Voter('democrat');
console.log(v1);
function HitCounter(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.name = "HitCounter";
            _this.multiplier = 1;
            _this.hits = 0;
            _this.incrementHit = function () { _this.hits += _this.multiplier; };
            _this.getHitCount = function () { return _this.hits; };
            return _this;
        }
        return class_1;
    }(Base));
}
