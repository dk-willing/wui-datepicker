class EventBus {
  constructor() {
    // This is our events registry
    this.listeners = new Map();
  }

  on(event, callback) {
    // This checks if that event already exits if not it initializes it
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event).push(callback);

    // A cleanup function must be returned after a subscriber is done listening to an event
    return () => this.off(event, callback);
  }

  emit(event, data) {
    if (!this.listeners.has(event)) return;

    const callbacks = [...this.listeners.get(event)];

    callbacks.forEach((cb) => {
      try {
        cb(data);
      } catch (e) {
        console.error(`Error in EventBut for "${event}": ${e}`);
      }
    });
  }

  off(event, callback) {
    if (!this.listeners.has(event)) return;

    const callbacks = this.listeners.get(event);

    const index = callbacks.indexOf(callback);

    if (index > -1) {
      callbacks.splice(index, 1);
    }

    if (callbacks.length === 0) {
      this.listeners.delete(event);
    }
  }

  once(event, callback) {
    const wrapper = (data) => {
      callback(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  clear(event) {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  listenersCount(event) {
    if (event) {
      return this.listeners.has(event) ? this.listeners.get(event).length : 0;
    }
    let count = 0;
    this.listeners.forEach((cbs) => (count += cbs.length));
    return count;
  }
}
