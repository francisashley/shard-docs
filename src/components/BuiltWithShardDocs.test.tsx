import React from 'react'
import { render, screen } from '@testing-library/react'
import BuiltWithShardDocs from './BuiltWithShardDocs'

test('<BuiltWithShardDocs /> renders with default props', () => {
  render(<BuiltWithShardDocs />)
  expect(screen).toBeTruthy()
})
