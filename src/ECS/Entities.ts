import { Mixin, settings } from 'ts-mixer';

import { Actor, Moveable, Recipient, Sight } from './Mixins';
import { Entity } from "./Entity";

settings.prototypeStrategy = 'copy';
settings.initFunction = 'init';


export class Player extends Mixin(Entity, Moveable, Sight, Actor, Recipient) {}
