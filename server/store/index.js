class Store {
  constructor() {
    this.dataStore = {};
  }

  set(key, value) {
    this.dataStore[key] = value;
  }

  del(key) {
    delete this.dataStore[key];
  }

  get(key) {
    return this.dataStore[key];
  }
}

const store = new Store();

module.exports = {
  store,
};
