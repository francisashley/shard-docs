import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MainPagination from './MainPagination'

const prevPage = { name: 'Prev', path: '/prev' }
const nextPage = { name: 'Next', path: '/next' }

test('<MainPagination /> renders nothing', () => {
  render(
    <MemoryRouter>
      <MainPagination />
    </MemoryRouter>
  )
  expect(screen.queryAllByRole('link').length).toBe(0)
})

test('<MainPagination /> renders prev page', () => {
  render(
    <MemoryRouter>
      <MainPagination prevPage={prevPage} />
    </MemoryRouter>
  )
  expect(screen.queryAllByRole('link').length).toBe(1)
  expect(screen.getByText('⟵ Prev')).toBeTruthy()
})

test('<MainPagination /> renders next page', () => {
  render(
    <MemoryRouter>
      <MainPagination nextPage={nextPage} />
    </MemoryRouter>
  )
  expect(screen.queryAllByRole('link').length).toBe(1)
  expect(screen.getByText('Next ⟶')).toBeTruthy()
})

test('<MainPagination /> renders both pages', () => {
  render(
    <MemoryRouter>
      <MainPagination prevPage={prevPage} nextPage={nextPage} />
    </MemoryRouter>
  )

  expect(screen.queryAllByRole('link').length).toBe(2)
  expect(screen.getByText('⟵ Prev')).toBeTruthy()
  expect(screen.getByText('Next ⟶')).toBeTruthy()
})
