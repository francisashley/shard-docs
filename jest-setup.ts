import '@testing-library/jest-dom'
import '@testing-library/user-event'

const originalConsoleError = global.console.error

/**
 * Ensure propType errors fail the tests.
 */
global.beforeEach(() => {
  global.console.error = (...args) => {
    const propTypeFailures = [/Failed prop type/, /Warning: Received/]

    if (propTypeFailures.some((p) => p.test(args[0]))) {
      throw new Error(args[0])
    }

    originalConsoleError(...args)
  }
})

// Mock localStorage
const localStorageMock = (function () {
  let store = {} as { [key: string]: string }

  return {
    getItem: function (key: string) {
      return store[key] || null
    },
    setItem: function (key: string, value: any) {
      store[key] = value.toString()
    },
    removeItem: function (key: string) {
      delete store[key]
    },
    clear: function () {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})
