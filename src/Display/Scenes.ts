import { Scene } from './';


class StartScene implements Scene
{
  constructor()
  {

  }

  public enter(): void
  {

  }

  public exit(): void
  {

  }
}


class PlayScene implements Scene
{
  constructor()
  {

  }

  public enter(): void
  {
    console.log("Play Scene started!");
  }

  public exit(): void
  {

  }
}


export { StartScene, PlayScene };