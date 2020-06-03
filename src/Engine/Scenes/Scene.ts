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
  public enter(): void {}
  public exit(): void {}
  public render(): void {}
}