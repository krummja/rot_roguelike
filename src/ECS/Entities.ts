import { IProperties } from '../types';

export const playerTemplate: IProperties = {
  character: '@',
  name: 'Player',
  foreground: [228, 79, 163],
  background: [0, 0, 0] || null,
  sightRadius: 20,
};

export const batTemplate: IProperties = {
  character: 'w',
  name: 'Bat',
  foreground: [255, 255, 74],
  background: [0, 0, 0] || null,
};