import { EventEmitter } from 'events';
import { Tile } from './Display';

function shuffleCoordArray(array: Array<{x: number, y: number}>): Array<{x: number, y: number}> {
  let shuffled: Array<{x: number, y: number}>
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    shuffled = [array[i], array[j]] = [array[j], array[i]];
  }
  return shuffled;
}

const EVENTS = new EventEmitter();



export { shuffleCoordArray, EVENTS };