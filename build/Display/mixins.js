"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mixer_1 = require("ts-mixer");
ts_mixer_1.settings.initFunction = 'init';
let Person = /** @class */ (() => {
    class Person {
        init() {
            Person.allPeople.add(this);
        }
    }
    Person.allPeople = new Set();
    return Person;
})();
// Define a class that can make use of any/all of the expected type options.
let PoliticalParticipant = /** @class */ (() => {
    class PoliticalParticipant {
        // The constructor will accept elements from that type.
        constructor(party) {
            this.party = party;
        }
        // Method `init` deals with the possible type solutions.
        init(party) {
            if (party === 'democrat') {
                PoliticalParticipant.democrats.add(this);
            }
            else {
                PoliticalParticipant.republicans.add(this);
            }
        }
    }
    // Make a set for each option.
    PoliticalParticipant.democrats = new Set();
    PoliticalParticipant.republicans = new Set();
    return PoliticalParticipant;
})();
// The mixin happens when we combine the first class with the second, adding properties from the former to the latter.
class Voter extends ts_mixer_1.Mixin(Person, PoliticalParticipant) {
}
const v1 = new Voter('democrat');
console.log(v1);
function HitCounter(Base) {
    return class extends Base {
        constructor(...args) {
            super(...args);
            this.name = "HitCounter";
            this.multiplier = 1;
            this.hits = 0;
            this.incrementHit = () => { this.hits += this.multiplier; };
            this.getHitCount = () => { return this.hits; };
        }
    };
}
