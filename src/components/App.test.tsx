import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '@/components/App'

const data = [
  { name: 'Doc A', content: <h2>Doc A</h2> },
  { name: 'Doc B', content: <h2>Doc B</h2> },
]

test('<App /> renders with default props', () => {
  render(<App />)
  expect(screen).toBeTruthy()
})

test('<App /> renders with props', async () => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1300,
  })

  render(<App title="App title" data={data} />)

  // Renders sidebar
  expect(await screen.getByRole('complementary')).toBeTruthy()

  // Renders title
  expect(screen.getByText('App title')).toBeTruthy()

  // Renders menu
  expect(screen.getByRole('navigation').querySelectorAll('a').length).toBe(2)

  // Renders sidebar footer
  expect(screen.getByLabelText('Built with shard docs')).toBeTruthy()

  // Renders main
  expect(screen.getByRole('main')).toBeTruthy()

  // Renders Page
  expect(screen.getByText('Doc A', { selector: 'h2' })).toBeTruthy()
})

test('<App /> can hide sidebar footer', () => {
  render(<App hideBuiltWithShardDocs />)
  expect(screen.queryByRole('contentinfo')).toBeFalsy()
})
