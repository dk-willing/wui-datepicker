class StateManager {
  constructor(eventBus, initialState = {}) {
    // eventBus
    this.eventBus = eventBus;

    // state
    this.state = {
      viewMonth: new Date().getMonth(),
      viewYear: new Date().getFullYear(),
      selectedDate: null,

      isOpen: false,

      ...initialState,
    };

    // To get the previous state
    this.previousState = {
      ...this.state,
    };
  }

  // getState
  getState() {
    return { ...this.state };
  }

  //   Get value
  get(key) {
    return this.state[key];
  }

  //   Set State
  setState(updates) {
    this.previousState = { ...this.state };

    this.state = {
      ...this.state,
      ...updates,
    };

    Object.keys(updates).forEach((key) => {
      if (this.previousState[key] !== this.state[key]) {
        this.eventBus.emit(`state:${key}`, {
          value: this.state[key],
          previous: this.previousState[key],
        });
      }
    });

    this.eventBus.emit("state:change", {
      state: this.getState(),
      previous: this.previousState,
      changes: updates,
    });
  }

  //   selectedDate
  setSelectedDate(date) {
    this.setState({ selectedDate: date });

    this.eventBus.emit("date:changed", { date });
  }

  //   setView
  setView(month, year) {
    if (month > 11) {
      month = 0;
      year++;
    } else if (month < 0) {
      month = 11;
      year--;
    }

    this.setState({
      viewMonth: month,
      viewYear: year,
    });

    this.eventBus.emit("view:change", { month, year });
  }

  navigate(monthOffset = 0, yearOffset = 0) {
    const newMonth = this.state.viewMonth + monthOffset;
    const newYear = this.state.viewYear + yearOffset;

    this.setView(newMonth, newYear);
  }

  //   Open picker
  open() {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
      this.eventBus.emit("picker:open");
    }
  }

  //   Close picker
  close() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
      this.eventBus.emit("picker:close");
    }
  }

  //   Toggle between open and close
  toggle() {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  goToToday() {
    const today = new Date();
    this.setView(today.getMonth(), today.getFullYear());
    this.setSelectedDate(today);
  }

  //   Clear
  clear() {
    this.setSelectedDate(null);
    this.eventBus.emit("date:clear");
  }

  //   Reset
  reset(initialState = {}) {
    const defaultState = {
      viewMonth: new Date().getMonth(),
      viewYear: new Date().getFullYear(),
      selectedDate: null,
      isOpen: false,
      ...initialState,
    };

    this.previousState = { ...this.state };
    this.state = defaultState;

    this.eventBus.emit("state:reset", { state: this.getState() });
  }
}

export default StateManager;
