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

test('<AppSidebar /> renders app title', () => {
  render(
    <MemoryRouter>
      <AppSidebar title={'App title'} />
    </MemoryRouter>
  )
  expect(screen.queryByText('App title')).toBeTruthy()
})

test('<AppSidebar /> renders menu', () => {
  render(
    <MemoryRouter>
      <AppSidebar items={items} device="desktop" />
    </MemoryRouter>
  )
  expect(screen.getByRole('navigation').querySelectorAll('a').length).toBe(1)
})

test('<AppSidebar /> renders sidebar footer', () => {
  render(
    <MemoryRouter>
      <AppSidebar items={items} />
    </MemoryRouter>
  )

  expect(screen.getByRole('contentinfo')).toBeTruthy()
})

test('<AppSidebar /> can hide sidebar footer', () => {
  render(
    <MemoryRouter>
      <AppSidebar hideBuiltWithShardDocs />
    </MemoryRouter>
  )

  expect(screen.queryByRole('contentinfo')).toBeFalsy()
})

test('<AppSidebar /> displays properly on mobile', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <AppSidebar device="mobile" />
    </MemoryRouter>
  )

  expect(screen.queryByRole('navigation')).toBeFalsy()
  await user.click(screen.getByRole('button'))
  expect(screen.getByRole('navigation')).toBeVisible()
  await user.click(screen.getByRole('button'))
  expect(screen.queryByRole('navigation')).toBeFalsy()
})

test('<AppSidebar /> displays properly on desktop', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <AppSidebar device="desktop" />
    </MemoryRouter>
  )

  expect(screen.queryByRole('navigation')).toBeTruthy()
  await user.click(screen.getByRole('button'))
  expect(screen.getByRole('navigation')).toBeVisible()
  await user.click(screen.getByRole('button'))
  expect(screen.queryByRole('navigation')).toBeTruthy()
})

test('<AppSidebar /> closes sidebar menu when navigating on mobile', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <AppSidebar items={items} device="mobile" />
    </MemoryRouter>
  )

  expect(screen.queryByRole('navigation')).toBeFalsy()
  await user.click(screen.getByRole('button'))
  expect(screen.getByRole('navigation')).toBeVisible()
  await user.click(screen.getAllByRole('link')[1])
  expect(screen.queryByRole('navigation')).toBeFalsy()
})
