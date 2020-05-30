

class Subject implements ISubject
{
  public observers: Observer[];
  public state: number;

  public attach(observer: Observer): void
  {
    const exists = this.observers.includes(observer);
    if (exists) {
      return console.log('Subject: Observer has already been attached.');
    }

    console.log('Subject: Attached an observer.');
    this.observers.push(observer);
  }

  public detach(observer: Observer): void
  {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Subject: Detached an observer.');
  }

  public notify(): void
  {
    console.log('Subject: Notifying observers...');
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}


abstract class Observer implements IObserver
{
  public update(subject: Subject): void { }
}


interface IObserver {
  update(subject: Subject): void;
}

interface ISubject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

export { Subject, Observer };