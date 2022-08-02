import React from 'react'
import { render, screen } from '@testing-library/react'
import AppNavMenuListButton from './AppNavMenuListButton'
import { MemoryRouter } from 'react-router-dom'

test('Renders internal link', () => {
  render(
    <MemoryRouter>
      <AppNavMenuListButton name="Home" url="/home" />
    </MemoryRouter>
  )
  expect(screen.getByRole('link')).toBeInTheDocument()
  expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'Navigate to page: Home')
  expect(screen.getByRole('link')).toHaveTextContent('Home')
})

test('Renders external link', () => {
  render(
    <MemoryRouter>
      <AppNavMenuListButton name="Github" url="https://www.github.com" />
    </MemoryRouter>
  )
  expect(screen.getByRole('link')).toBeInTheDocument()
  expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'Open external link: Github')
  expect(screen.getByRole('link')).toHaveTextContent('Github')
})

test('Renders menu button', () => {
  render(
    <MemoryRouter>
      <AppNavMenuListButton name="Examples" />
    </MemoryRouter>
  )
  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByRole('button')).toHaveTextContent('Examples')
})
