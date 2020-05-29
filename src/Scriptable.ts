

const Scriptable = (parentClass: any) =>
  class extends parentClass
  {
    emit(name: string, ...args: any): void {
      if (this.__pruned) {
        this.removeAllListeners();
        return;
      }
    }

    hasBehavior(name: string): boolean
    {
      return this.behaviors.has.name;
    }

    getBehavior(name: string)
    {
      return this.behaviors.get.name;
    }

    // TODO: Change type annotation.
    setBehaviors(manager: any)
    {
      for (let [behaviorName, config] of this.behaviors) {
        let behavior = manager.get(behaviorName);
        if (!behavior) {
          throw new Error(`No script found for [${this.constructor.name}] behavior '${behaviorName}'`);
          continue;
        }

        config = config === true ? {} : config;
        behavior.attach(this, config);
      }
    }
  }


export { Scriptable };