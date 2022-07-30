export default {
  get: (key: string, defaultValue?: unknown) => {
    let value = sessionStorage.getItem(key)
    return value !== null ? JSON.parse(value) : defaultValue
  },
  set: (key: string, value: unknown) => {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
}
