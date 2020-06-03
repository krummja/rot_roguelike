import * as Display from '../../Display';

export interface IScene
{
  sceneKey: string;
  enter(): void;
  exit(): void;
  render(): void;
 }


export class Scene implements IScene
{
  public sceneKey: string;
  public width?: number;
  public height?: number;
  public enter(): void {}
  public exit(): void {}
  public render(): void {}
}