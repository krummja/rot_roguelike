import { Mixin, settings } from 'ts-mixer';
import { Entity, Moveable, Sight, Actor, Recipient } from './mixins';

settings.prototypeStrategy = 'copy';
settings.initFunction = 'init';


export class Player extends Mixin(Entity, Moveable, Sight, Actor, Recipient) {}