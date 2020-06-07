import { EventEmitter } from 'events';
import * as ROT from 'rot-js';

import { Player, Entity } from '../ECS';
import { Builder } from '../Builder';
import { Game } from '../Game';
import { IScreen, Map, Tile } from './';

class PlayScreen implements IScreen
{
  public game: Game;
  public key: string = "PLAY";
  
  public map: Map;
  public mapArray: Array<Array<Tile>> = null;
  public mapWidth: number = 200;
  public mapHeight: number = 100;

  public get player(): Player { return this._player; }
  private readonly _player: Player;

  private _EVENTS: EventEmitter;


  constructor(game: Game)
  {
    this.game = game;
    this._player = new Player({
      character: '@',
      name: 'Player',
      foreground: [228, 79, 163],
      background: [0, 0, 0] || null,
      sightRadius: 20,
    }, this.game, this.map);

    this._EVENTS = Game.EVENTS;
  }


  public enter()
  {
    let width = this.mapWidth;
    let height = this.mapHeight;
    let depth = 3;
    let ratio = 0.70;
    let iterations = 100;
    let tilesFilled = 50;
    
    let tiles = new Builder(width, height, depth, ratio, iterations, tilesFilled).tiles;
    this.map = new Map(tiles, this._player);
    this.map.engine.start();
    this._EVENTS.emit('ready');
  }

  public exit(): void
  {
    console.log('PlayScreen.exit:   Exited play screen.');
  }

  public render(display: ROT.Display): void
  {
    let screenWidth = this.game.screenWidth;
    let screenHeight = this.game.screenHeight;

    let entities = this.map.entities;
    
    // Figure out the viewport dimensions
    let topLeftX = Math.max(0, this._player.x - (screenWidth / 2));
    topLeftX = Math.min(topLeftX, this.map.width - screenWidth);
    let topLeftY = Math.max(0, this._player.y - (screenHeight / 2));
    topLeftY = Math.min(topLeftY, this.map.height - screenHeight);

    let visibleCells: { [key: string]: boolean } = {};
    let map = this.map;
    let currentDepth = this._player.z;
    
    // Handle FOV and explored flagging
    map.getFov(this._player.z).compute(
      this._player.x, 
      this._player.y, 
      this._player.sightRadius, 
      (x: number, y: number, r: number, vis: number) => {
        visibleCells[x+","+y] = true;
        map.setExplored(x, y, currentDepth, true);
      }
    );

    // Put bounds on the viewport movement relative to the map edge
    for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
      for (let y = topLeftY; y < topLeftY + screenHeight; y++) {

        // Check if the cell has been explored
        if (map.isExplored(x, y, currentDepth)) {
          let tile = this.map.getTile(x, y, currentDepth);
          let background: [number, number, number] = tile.bg;

          let darken = (color: [number, number, number]): [number, number, number] => {
            let darkerColor = ROT.Color.interpolate(ROT.Color.multiply(color, [50, 50, 50]), [0, 0, 0]);
            return darkerColor;
          };

          if (visibleCells[x+','+y]) {
            background = tile.bg;
          } else {
            background = (darken(background));
          }

          display.draw(
            x - topLeftX,
            y - topLeftY,
            tile.char,
            (ROT.Color.toHex(tile.fg)).toString(),
            (ROT.Color.toHex(background)).toString()
          );
        }
      }
    }

    // Render all entities
    for (let key in entities) {
      let entity: Entity = entities[key];
      if (entity.x >= topLeftX && entity.y >= topLeftY &&
          entity.x < topLeftX + screenWidth &&
          entity.y < topLeftY + screenHeight &&
          entity.z == this._player.z) {
        if (visibleCells[entity.x + ',' + entity.y]) {
          display.draw(
            entity.x - topLeftX,
            entity.y - topLeftY,
            entity.char,
            (ROT.Color.toHex(entity.fg)).toString(),
            (ROT.Color.toHex(entity.map.getBgTint(entity.x, entity.y, entity.z, this.map))).toString()
          )
        }
      }
    }

    this.game.messageManager.renderMessage(0, 0, 'position');
    this.game.messageManager.renderMessage(0, 55, 'tryMove');
  }

  public handleInput(inputType: string, inputData: any): void
  {
    if (inputType === 'keydown') {
      
      if (inputData.keyCode === ROT.KEYS.VK_NUMPAD4) {
        this.move(-1, 0, 0);
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD6) {
        this.move(1, 0, 0);
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD8) {
        this.move(0, -1, 0);
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD2) {
        this.move(0, 1, 0);
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD1) {
        this.move(0, 0, 1);   // Move down
      } else if (inputData.keyCode === ROT.KEYS.VK_NUMPAD7) {
        this.move(0, 0, -1);  // Move up
      } else {
        return;
      }

      this.map.engine.unlock();
      this.game.refresh();
    }
  }

  public move(dX: number, dY: number, dZ: number): void
  {
    let newX = this._player.x + dX;
    let newY = this._player.y + dY;
    let newZ = this._player.z + dZ;
    this._player.tryMove(newX, newY, newZ);
    this._EVENTS.emit('position')
  }
}


export { PlayScreen };