import { Screen } from './types'
import { Game } from './Game';
import { Player, Entity } from './ECS';
import { Map } from './Display';

export class PositionManager
{
  private _screen: Screen;
  private _map: Map;
  private _player: Player;
  private _entities: {[key: string]: Entity}

  constructor(screen: Screen)
  {
    this._screen = screen;
    this._player = this._screen.player;
    this._map = this._screen.map

    Game.EVENTS.on('player', (action: string, x: number, y: number, z: number) => {
      let entity = this._player;

      // Action: move
      if (action === 'move') {
        this._map.setPosition(entity, x, y, z);
      }
    })
  }
}