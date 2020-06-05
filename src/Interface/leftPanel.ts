import { Game } from "../game";

class LeftPanel
{
  private _container: HTMLElement;
  private _game: Game;
  private _player: any;

  constructor(game: Game)
  {
    this._game = game;
    this._container = document.getElementById("left-panel");
    
    let textBox = document.createElement("span");
    // let text = document.createTextNode(
    //   "Position: " + "... placeholder"
    // );
    // textBox.appendChild(text);
    // this._container.appendChild(textBox);
  }
}


export { LeftPanel };