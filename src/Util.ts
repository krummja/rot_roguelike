
interface ISubject
{
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

class Subject implements ISubject
{
  // Internal array of Systems observing this Subject
  private _observers: Observer[];
  
  constructor()
  {
    this._observers = [];
  }

  // Attach a new System
  public attach(observer: Observer): void
  {
    const exists = this._observers.includes(observer);
    if (exists) {
      return console.log('Subject: Observer has already been attached.');
    }

    console.log('Subject: Attached an observer.');
    this._observers.push(observer);
  }

  // Detach a system in the array of Observers
  public detach(observer: Observer): void
  {
    const observerIndex = this._observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }

    this._observers.splice(observerIndex, 1);
    console.log('Subject: Detached an observer.');
  }

  // Notify the Observers that Subject's State has changed
  public notify(): void
  {
    if (this._observers.length >= 1) {
      console.log('Subject: Notifying observers...');
      console.log(this._observers);
      for (const observer of this._observers) {
        observer.update(this);
      }
    } else {
      throw new Error("No observers registered. Nothing notified!");
    }
  }
}


interface IObserver
{
  update(subject: Subject): void;
}

class Observer implements IObserver
{
  public update(subject: Subject): void
  {
    // Do some stuff in reaction to state change in Subject
  }
}

export { Subject, Observer };