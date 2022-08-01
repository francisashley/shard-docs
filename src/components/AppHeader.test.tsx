import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppHeader from './AppHeader'

test('<AppHeader /> renders with default props', () => {
  render(
    <MemoryRouter>
      <AppHeader />
    </MemoryRouter>
  )
  expect(screen).toBeTruthy()
})

test('<AppHeader /> renders title', () => {
  render(
    <MemoryRouter>
      <AppHeader title="Hello world" />
    </MemoryRouter>
  )
  expect(screen.getByText('Hello world')).toBeTruthy()
})

test('<AppHeader /> renders header link with custom basePath', () => {
  render(
    <MemoryRouter>
      <AppHeader title="Hello world" basePath="/docs" />
    </MemoryRouter>
  )
  expect(screen.getByRole('link').getAttribute('href')).toBe('/docs')
})

test('<AppHeader /> renders toggle button', () => {
  render(
    <MemoryRouter>
      <AppHeader />
    </MemoryRouter>
  )
  expect(screen.findByLabelText('Open main menu')).toBeTruthy()
})
