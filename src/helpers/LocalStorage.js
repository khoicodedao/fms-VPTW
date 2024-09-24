let LocalStorage = {
  set(key, user) {
    localStorage.setItem(key, user)
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  remove(key) {
    localStorage.removeItem(key)
  },
}

export default LocalStorage
