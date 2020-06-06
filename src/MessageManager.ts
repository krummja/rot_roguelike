import { vsprintf } from 'sprintf';

import { EventEmitter } from 'events';
import { Game } from './Game';
import { Player } from './ECS';

export class MessageManager
{
  private _game: Game;
  private _EVENTS: EventEmitter;

  constructor(game: Game)
  {
    this._game = game;
    this._EVENTS = Game.EVENTS;
    
    this._EVENTS.on('position', () => {
      let player = this._game.currentScreen.player;
      this.sendMessage(player, 
        'position',
        "Position: %s", [player.x + "," + player.y]);
    })

    this._EVENTS.on('tryMove', (s: string) => {
      this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
    });
  }

  public sendMessage(recipient: Player, sender: string, message: string, args: any)
  {
    message = vsprintf(message, args);
    recipient.receiveMessage(sender, message);
  }

  // Change this so that as y decreases, the text fades out
  public renderMessage(x: number, y: number, sender: string, direction: string = 'down')
  {
    let messages = this._game.currentScreen.player.messages[sender];

    for (let i = 0; i < messages.length; i++) {
      if (direction === 'up') {
        y -= this._game.display.drawText(x, y, '%c{white}%b{black}' + messages[i]);
      } else if (direction === 'down') {
        y += this._game.display.drawText(x, y, '%c{white}%b{black}' + messages[i]);
        console.log(y);
      }
    }
  }

  public clearMessages(buffer: number = 0, sender: string)
  {
    let messages = this._game.currentScreen.player.messages[sender];

    if (messages.length >= 2 + buffer) {
      messages.shift();
    }
  }
}