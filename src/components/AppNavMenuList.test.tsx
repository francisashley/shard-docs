import React from 'react'
import { render, screen } from '@testing-library/react'
import AppNavMenuList from '@/components/AppNavMenuList'
import { MemoryRouter } from 'react-router-dom'
import dataTools from '@/utils/dataTools'

const items = dataTools.parse([
  {
    name: 'Examples',
    content: [{ name: 'Example A', content: <h1>Doc A</h1> }],
  },
])

test('Renders menu', () => {
  render(
    <MemoryRouter>
      <AppNavMenuList items={items} />
    </MemoryRouter>
  )

  expect(screen.getByRole('list')).toBeInTheDocument()
})

test('Hides menu', () => {
  render(
    <MemoryRouter>
      <AppNavMenuList items={items} hidden />
    </MemoryRouter>
  )

  expect(screen.queryByRole('list')).not.toBeInTheDocument()
})
