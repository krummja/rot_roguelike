import { vsprintf } from 'sprintf';

import { Game } from './Game';
import { Player } from './ECS';

export class MessageManager
{
  private _game: Game;

  constructor(game: Game)
  {
    this._game = game;
    
    Game.EVENTS.on('position', () => {
      let player = this._game.currentScreen.player;
      this.sendMessage(player, 
        'position',
        "Position: %s", [player.x + "," + player.y]);
    })

    // Player Events
    Game.EVENTS.on('player', (action: string, type: string, result: string) => {

      // Action: tryMove
      if (action === 'tryMove') {

        // Action Type: up
        if (type === 'up') {

          // Success?
          if (result === 'success') {
            let s = 'You follow the passage upward.'
            this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
          } 
          
          // Failure?
          else if (result === 'failure') {
            let s = 'You can\'t ascend here!.'
            this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
          }
        } 
        
        // Action Type: down
        else if (type === 'down') {
          
          // Success?
          if (result === 'success') {
            let s = 'You follow the passage downward.'
            this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
          } 
          
          // Failure?
          else if (result === 'failure') {
            let s = 'You can\'t descend here!'
            this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
          }
        }

        // Action Type: move
        else if (type === 'move') {
          
          // Success?
          if (result === 'success') {
            let s = ' '
            this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
          } 
          
          // Failure?
          else if (result === 'failure') {
            let s = 'You can\'t move there!'
            this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
          }
        }

        // Action Type: dig
        else if (type === 'dig') {
          
          // Success?
          if (result === 'success') {
            let s = 'The stone gives and crumbles at your feet!'
            this.sendMessage(this._game.currentScreen.player, 'tryMove', '%s', [s]);
          }
        }
      }
      // End

    });
  }

  public sendMessage(recipient: Player, sender: string, message: string, args: any)
  {
    message = vsprintf(message, args);
    recipient.receiveMessage(sender, message);
  }

  // Change this so that as y decreases, the text fades out
  public renderMessage(x: number, y: number, sender: string)
  {
    let messages = this._game.currentScreen.player.messages[sender];

    for (let i = 0; i < messages.length; i++) {
      y += this._game.display.drawText(x, y, '%c{white}%b{black}' + messages[i]);
    }
  }

  public clearMessages(buffer: number = 0, sender: string, fade: boolean = false)
  {
    let messages = this._game.currentScreen.player.messages[sender];
    if (messages.length > 1 + buffer) {
      messages.shift();
    }
  }
}