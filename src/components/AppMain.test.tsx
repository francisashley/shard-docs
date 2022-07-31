import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import AppMain from './AppMain'

const prevPage = { name: 'Prev', path: '/prev' } as paginationPage
const nextPage = { name: 'Next', path: '/next' } as paginationPage
const page = {
  type: 'page',
  content: (
    <>
      <h1>Hello earth!</h1>,<h2>Hello galaxy!</h2>,<h3>Hello universe!</h3>,
    </>
  ),
} as page

const mountMain = (options: {
  prevPage?: paginationPage
  nextPage?: paginationPage
  page?: page
}) => {
  const { prevPage, nextPage, page = null } = options
  return mount(
    <MemoryRouter>
      <AppMain prevPage={prevPage} nextPage={nextPage} page={page} />
    </MemoryRouter>
  )
}

test('<Pagination /> renders Pagination', () => {
  const wrapper = mountMain({ prevPage, nextPage })

  expect(wrapper.find('MainPagination').exists()).toBe(true)
})

test('<Pagination /> renders Page', () => {
  const wrapper = mountMain({ prevPage, nextPage, page })

  expect(wrapper.find('MainContent').length).toBe(1)
})
