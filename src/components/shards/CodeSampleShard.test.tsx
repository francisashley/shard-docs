import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CodeSampleShard from './CodeSampleShard'

const repository = 'github.com'
const sourceCode = `
<HelloWorld />
`

test('<CodeSampleShard /> renders with default props', () => {
  render(<CodeSampleShard />)
  expect(screen).toBeTruthy()
  expect(screen.queryByLabelText('Toggle code')).not.toBeInTheDocument()
  expect(screen.queryByLabelText('View repository')).not.toBeInTheDocument()
})

test('<CodeSampleShard /> renders title', () => {
  render(<CodeSampleShard title="Hello world" />)
  expect(screen.getByRole('heading')).toHaveTextContent('Hello world')
})

test('<CodeSampleShard /> renders source code button when sourceCode provided', () => {
  render(<CodeSampleShard sourceCode={sourceCode} />)
  expect(screen.getByLabelText('Toggle code')).toBeInTheDocument()
})

test('<CodeSampleShard /> renders repository anchor when repository provided', () => {
  render(<CodeSampleShard repository={repository} />)
  expect(screen.getByLabelText('View repository')).toBeInTheDocument()
})

test('<CodeSampleShard /> renders example', () => {
  render(
    <CodeSampleShard>
      <h2>Hello world</h2>
    </CodeSampleShard>
  )
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Hello world')
})

test('<CodeSampleShard /> renders example in an iframe', () => {
  // cannot currently test the iframe
  // https://github.com/ryanseddon/react-frame-component/issues/193
  // render(
  //   <CodeSampleShard useIframe>
  //     <h1>Hello world</h1>
  //   </CodeSampleShard>
  // )
  // screen.debug()
  // expect(screen.queryByRole('presentation')).toBeInTheDocument()
})

test('<CodeSampleShard /> toggles sourceCode', async () => {
  const user = userEvent.setup()
  render(
    <CodeSampleShard sourceCode={sourceCode}>
      <h1>Hello world</h1>
      <h2>Hello galaxy</h2>
    </CodeSampleShard>
  )

  expect(screen.queryByLabelText('Source code')).not.toBeInTheDocument()

  await user.click(screen.getByLabelText('Toggle code'))

  expect(screen.getByLabelText('Source code')).toBeInTheDocument()
})
