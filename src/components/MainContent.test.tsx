import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MainContent from './MainContent'

it('<MainContent /> renders with default props', () => {
  render(<MainContent />)
  expect(screen).toBeTruthy()
})

it('<MainContent /> renders content', () => {
  render(
    <MemoryRouter>
      <MainContent
        content={
          <>
            <h2>Hello earth!</h2>
            <h3>Hello galaxy!</h3>
            <h4>Hello universe!</h4>
          </>
        }
      />
    </MemoryRouter>
  )

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Hello earth!')
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Hello galaxy!')
  expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Hello universe!')
})
