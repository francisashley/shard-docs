import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CodeSampleShard from './CodeSampleShard'

const github = 'github.com'

test('<CodeSampleShard /> renders with default props', () => {
  render(<CodeSampleShard />)
  expect(screen).toBeTruthy()
})

test('<CodeSampleShard /> renders the github button when provided a path', () => {
  render(<CodeSampleShard github={github} />)
  expect(screen.getByLabelText('View github repository')).toBeInTheDocument()
})

test('<CodeSampleShard /> renders example', () => {
  render(
    <CodeSampleShard>
      <h2>Hello world</h2>
    </CodeSampleShard>
  )
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Hello world')
})

test('<CodeSampleShard /> toggles sourceCode', async () => {
  const user = userEvent.setup()
  render(
    <CodeSampleShard>
      <h1>Hello world</h1>
      <h2>Hello galaxy</h2>
    </CodeSampleShard>
  )

  expect(screen.queryByLabelText('Source code')).not.toBeInTheDocument()

  await user.click(screen.getByLabelText('Toggle code'))

  expect(screen.getByLabelText('Source code')).toBeInTheDocument()
})
