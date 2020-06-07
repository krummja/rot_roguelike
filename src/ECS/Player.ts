import { Mixin, settings } from 'ts-mixer';

import { Entity } from './Entity';
import { 
  Combatant, 
  PlayerActor, 
  Recipient, 
  Sight 
} from './Mixins';

settings.prototypeStrategy = 'copy';
settings.initFunction = 'init';

export class Player extends Mixin(
  Entity, 
  Combatant,
  PlayerActor, 
  Recipient,
  Sight, 
) {}