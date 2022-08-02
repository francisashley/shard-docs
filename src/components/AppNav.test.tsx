import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppNav from './AppNav'
import dataTools from '../utils/dataTools'

const items = dataTools.parse([{ name: 'Doc A', content: <h1>Doc A</h1> }])

test('<AppNav /> is hidden by default on mobile devices', () => {
  render(
    <MemoryRouter>
      <AppNav items={items} device="mobile" />
    </MemoryRouter>
  )

  expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
})

test('<AppNav /> can be shown on mobile devices', () => {
  render(
    <MemoryRouter>
      <AppNav items={items} device="mobile" showOnMobile={true} />
    </MemoryRouter>
  )
  expect(screen.queryByRole('navigation')).toBeInTheDocument()
})

test('<AppNav /> is always visible on desktop', () => {
  const { rerender } = render(
    <MemoryRouter>
      <AppNav items={items} device="desktop" />
    </MemoryRouter>
  )
  expect(screen.queryByRole('navigation')).toBeInTheDocument()
  rerender(
    <MemoryRouter>
      <AppNav items={items} device="desktop" />
    </MemoryRouter>
  )
  expect(screen.queryByRole('navigation')).toBeInTheDocument()
})
