import { Mixin, settings } from 'ts-mixer';
import { Constructor } from '../types';

settings.initFunction = 'init';

class Person
{
  public static allPeople: Set<Person> = new Set();
  protected init(): void {
    Person.allPeople.add(this);
  }
}

// Create a disjunctive type
type PartyAffiliation = 'democrat' | 'republican';

// Define a class that can make use of any/all of the expected type options.
class PoliticalParticipant
{
  // Make a set for each option.
  public static democrats: Set<PoliticalParticipant> = new Set();
  public static republicans: Set<PoliticalParticipant> = new Set();

  // Define a public member that is typeof the disjunctive type.
  public party: PartyAffiliation;

  // The constructor will accept elements from that type.
  public constructor(party: PartyAffiliation)
  {
    this.party = party;
  }

  // Method `init` deals with the possible type solutions.
  protected init(party: PartyAffiliation): void
  {
    if (party === 'democrat') {
      PoliticalParticipant.democrats.add(this);
    } else {
      PoliticalParticipant.republicans.add(this);
    }
  }
}

// The mixin happens when we combine the first class with the second, adding properties from the former to the latter.
class Voter extends Mixin(Person, PoliticalParticipant) {}

const v1 = new Voter('democrat');

console.log(v1);


function HitCounter<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    name: string;
    multiplier: number;
    hits: number;
    incrementHit: Function;
    getHitCount: Function;

    constructor(...args: any[]) {
      super(...args);
      this.name = "HitCounter";
      this.multiplier = 1;
      this.hits = 0;
      this.incrementHit = (): void => { this.hits += this.multiplier; }
      this.getHitCount = (): number => { return this.hits; }
    }
  }
}