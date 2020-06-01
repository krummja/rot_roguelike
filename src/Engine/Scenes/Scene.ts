export interface IScene
{

  enter(): void;
  exit(): void;
  render(): void;
 }


export class Scene implements IScene
{

  public enter(): void {}
  public exit(): void {}
  public render(): void {}
}