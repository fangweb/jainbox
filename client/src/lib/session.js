export default class Session {
  static set(k, v) {
    localStorage.setItem(k, v);
  }

  static get(k) {
    return localStorage.getItem(k);
  }

  static remove(k) {
    localStorage.removeItem(k);
  }

  static clear() {
    localStorage.clear();
  }
}
