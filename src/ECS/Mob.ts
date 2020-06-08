import { Mixin, settings } from 'ts-mixer';

import { Entity } from './Entity';
import { 
  Combatant,
  MobActor, 
  Moveable
} from './Mixins';

settings.prototypeStrategy = 'copy';
settings.initFunction = 'init';

export class Mob extends Mixin(
  Entity, 
  Combatant,
  MobActor, 
  Moveable
) {}