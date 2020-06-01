"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observer = exports.Subject = void 0;
class Subject {
    constructor() {
        this._observers = [];
    }
    // Attach a new System
    attach(observer) {
        const exists = this._observers.includes(observer);
        if (exists) {
            return console.log('Subject: Observer has already been attached.');
        }
        console.log('Subject: Attached an observer.');
        this._observers.push(observer);
    }
    // Detach a system in the array of Observers
    detach(observer) {
        const observerIndex = this._observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }
        this._observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }
    // Notify the Observers that Subject's State has changed
    notify(state) {
        this.state = state;
        if (this._observers.length >= 1) {
            console.log('Subject: Notifying observers...');
            for (const observer of this._observers) {
                observer.update(this);
            }
        }
        else {
            throw new Error("No observers registered. Nothing notified!");
        }
    }
}
exports.Subject = Subject;
class Observer {
    update(subject) {
        this.subjectState = subject.state;
    }
}
exports.Observer = Observer;
