import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AppSidebar from './AppSidebar'
import dataTools from '../utils/dataTools'

const items = dataTools.parse([{ name: 'Doc A', content: <h1>Doc A</h1> }])

test('<AppSidebar /> renders with default props', () => {
  render(
    <MemoryRouter>
      <AppSidebar />
    </MemoryRouter>
  )
  expect(screen).toBeTruthy()
})

test('<AppSidebar /> renders menu', () => {
  render(
    <MemoryRouter>
      <AppSidebar items={items} device="desktop" />
    </MemoryRouter>
  )
  expect(screen.getByRole('navigation').querySelectorAll('a').length).toBe(1)
})
