import * as Display from './Display';
import * as Scenes from './Engine/Scenes';

declare interface Positionable {
  walkable   ?: boolean;
  diggable   ?: boolean;
  opaque     ?: boolean;
  x          ?: number;
  y          ?: number;
}

declare interface Renderable {
  char  ?: string,
  font  ?: string,
  fg    ?: string,
  bg    ?: string
}

declare type Console = Display.Console;

declare type Scene = Scenes.Scene;