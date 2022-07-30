import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import NavTree from './NavTree'
import dataTools from '../utils/dataTools'

const items = dataTools.parse([
  { name: 'Doc A', content: <h1>Doc A</h1> },
  { name: 'Doc B', content: <h1>Doc B</h1> },
  { name: 'Doc C', content: <h1>Doc C</h1> },
  {
    name: 'Category',
    content: [
      { name: 'Doc D', content: <h1>Doc D</h1> },
      { name: 'Doc E', content: <h1>Doc E</h1> },
    ],
  },
  { name: 'Github', content: 'http://github.com' },
])

const mountMenuList = ({ items } = {} as { items: data }) => {
  const onNavigate = jest.fn()
  const wrapper = mount(
    <MemoryRouter>
      <NavTree onNavigate={onNavigate} items={items} />
    </MemoryRouter>
  )

  return { wrapper, onNavigate }
}

test('<NavTree /> renders with default props', () => {
  const { wrapper } = mountMenuList()

  expect(wrapper.exists()).toBe(true)
})

test('<NavTree /> renders with items data', () => {
  const { wrapper } = mountMenuList({ items })

  // Renders discrete category
  expect(wrapper.find('NavTree > NavCategory').at(0).find('li').length).toBe(3)

  // Renders category
  expect(wrapper.find('NavTree > NavCategory').at(1).find('a').first().text()).toBe('Category')
  expect(wrapper.find('NavTree > NavCategory').at(1).find('a').length).toBe(3)

  // Renders external link
  expect(wrapper.find('NavTree > NavCategory').at(2).find('li a').props().href).toBe(
    'http://github.com'
  )
  expect(wrapper.find('NavTree > NavCategory').at(2).find('li a').text()).toBe('Github')

  // Renders page
  expect(wrapper.find('NavTree > NavCategory').at(0).find('li a').first().text()).toBe('Doc A')
  expect(wrapper.find('NavTree > NavCategory').at(0).find('li a').first().props().href).toBe(
    '/doc-a'
  )
})

test('<MenuTree /> calls onNavigate', () => {
  const { wrapper, onNavigate } = mountMenuList({ items })

  wrapper.find('NavTree ul li a').first().simulate('click')

  expect(onNavigate.mock.calls.length).toBe(1)
})
