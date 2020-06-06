import { Mixin, settings } from 'ts-mixer';

import { Entity } from './Entity';
import { Combatant, MobActor, PlayerActor, Recipient, Sight } from './Mixins';
import { IProperties } from '../types';

settings.prototypeStrategy = 'copy';
settings.initFunction = 'init';

export const playerTemplate: IProperties = {
  character: '@',
  name: 'Player',
  foreground: [228, 79, 163],
  background: [0, 0, 0] || null,
  sightRadius: 20,
}

export const batTemplate: IProperties = {
  character: 'w',
  name: 'Bat',
  foreground: [255, 255, 74],
  background: [0, 0, 0] || null,
}


export class Player extends Mixin(
  Entity, 
  Combatant, 
  PlayerActor, 
  Recipient,
  Sight, 
) {}
export class Mob extends Mixin(
  Entity, 
  Combatant,
  MobActor, 
) {}