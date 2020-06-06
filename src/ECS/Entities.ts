import { Mixin, settings } from 'ts-mixer';

import { Actor, Mob, Combatant, Recipient, Sight } from './Mixins';
import { Entity } from "./Entity";

settings.prototypeStrategy = 'copy';
settings.initFunction = 'init';


export class Player extends Mixin(Entity, Sight, Actor, Recipient, Combatant) {}
export class NPC extends Mixin(Entity, Mob, Combatant) {}