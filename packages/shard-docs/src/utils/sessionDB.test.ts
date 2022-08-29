import sessionDB from './sessionDB'

test('sessionDB() sets and gets values from sessionStorage correctly', () => {
  expect(sessionDB.get('key')).toBe(undefined)
  expect(sessionDB.get('key', 'Default value')).toBe('Default value')
  sessionDB.set('key', 'Hello world')
  expect(sessionDB.get('key')).toBe('Hello world')
  sessionDB.set('key', 'Hello universe')
  expect(sessionDB.get('key')).toBe('Hello universe')
  sessionDB.set('is-bool', true)
  expect(sessionDB.get('is-bool')).toBe(true)
  sessionDB.set('is-array', [1, 2, 3])
  expect(sessionDB.get('is-array')).toEqual([1, 2, 3])
  sessionDB.set('is-object', { a: 'a', b: 'b' })
  expect(sessionDB.get('is-object')).toEqual({ a: 'a', b: 'b' })
})
