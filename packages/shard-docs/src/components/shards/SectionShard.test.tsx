import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SectionShard from './SectionShard'

const title = 'Hello world'

test('<SectionShard /> renders with default props', () => {
  render(<SectionShard />)
  expect(screen).toBeTruthy()
})

test('<SectionShard /> renders title', () => {
  render(<SectionShard title={title} />)
  expect(screen.getByRole('heading')).toHaveTextContent('Hello world')
})

test('<SectionShard /> renders body', () => {
  render(
    <SectionShard>
      <p data-testid="body">Hi</p>
    </SectionShard>
  )
  expect(screen.getByTestId('body')).toHaveTextContent('Hi')
})

test('<SectionShard /> can toggle body', async () => {
  const user = userEvent.setup()
  render(
    <SectionShard title={title}>
      <p data-testid="av">Hi</p>
    </SectionShard>
  )
  expect(screen.queryByTestId('av')).toBeInTheDocument()
  await user.click(screen.getByRole('link'))
  expect(screen.queryByTestId('av')).not.toBeInTheDocument()
})

test('<SectionShard /> remembers toggle state', async () => {
  const user = userEvent.setup()
  render(
    <SectionShard title={title} persistState="abc">
      <p>Hi</p>
    </SectionShard>
  )
  expect(localStorage.getItem('SectionShard-state-abc')).toBe(null)
  await user.click(screen.getByRole('link'))
  expect(JSON.parse(localStorage.getItem('SectionShard-state-abc') as string)).toBe(false)
  await user.click(screen.getByRole('link'))
  expect(JSON.parse(localStorage.getItem('SectionShard-state-abc') as string)).toBe(true)
})
