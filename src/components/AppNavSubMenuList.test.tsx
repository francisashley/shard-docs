import React from 'react'
import { render, screen } from '@testing-library/react'
import AppNavSubMenuList from '@/components/AppNavSubMenuList'
import { MemoryRouter } from 'react-router-dom'
import dataTools from '@/utils/dataTools'

const item = dataTools.parse([
  {
    name: 'Examples',
    content: [{ name: 'Example A', content: <h1>Doc A</h1> }],
  },
])[0] as category

test('Renders expanded menu', () => {
  render(
    <MemoryRouter>
      <AppNavSubMenuList item={{ ...item, isExpanded: true }} />
    </MemoryRouter>
  )
  expect(screen.getByRole('button')).toHaveTextContent('Examples')
  expect(screen.getByText('Example A')).toBeInTheDocument()
  expect(screen.getAllByRole('link').length).toBe(1)
  expect(screen.getByRole('list')).toBeInTheDocument()
})

test('Renders collapsed menu', () => {
  render(
    <MemoryRouter>
      <AppNavSubMenuList item={{ ...item, isExpanded: false }} />
    </MemoryRouter>
  )
  expect(screen.getByRole('button')).toHaveTextContent('Examples')
  expect(screen.queryByRole('list')).not.toBeInTheDocument()
})
