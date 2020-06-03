
/index
  new Engine.CORE
    new Display.Console()
    new Controller.Input()
    new SceneManager()
    new ROT.Scheduler.Simple()
    new ROT.Engine(Scheduler)
    new ECS.Engine()
    new ActorSystem()
    new PositionSystem()
    new RenderSystem()
  Engine.CORE.initialize()
    Input -> initialize()
    ECS.Engine -> addSystem(Actor)
    ECS.Engine -> addSystem(Position)
    ECS.Engine -> addSystem(Render)
    SceneManager -> Switch(START)
    SceneManager -> handleInput()
