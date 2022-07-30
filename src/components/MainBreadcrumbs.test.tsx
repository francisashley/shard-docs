import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import MainBreadcrumbs from './MainBreadcrumbs'

const breadcrumbs = [
  { name: '~', path: '/', isActive: false },
  { name: 'Examples', path: '/examples', isActive: false },
  { name: 'Hello world', path: '/examples/hello-world', isActive: true },
]

test('<MainBreadcrumbs /> renders with default props', () => {
  mount(<MainBreadcrumbs />)
})

test('<MainBreadcrumbs /> renders breadcrumbs', () => {
  const wrapper = mount(
    <MemoryRouter>
      <MainBreadcrumbs breadcrumbs={breadcrumbs} />
    </MemoryRouter>
  )

  expect(wrapper.find('.MainBreadcrumbs__item-link').hostNodes().length).toBe(3)
  expect(wrapper.find('.MainBreadcrumbs__item-link').hostNodes().at(0).prop('href')).toBe('/')
  expect(wrapper.find('.MainBreadcrumbs__item-link').hostNodes().at(1).prop('href')).toBe(
    '/examples'
  )
  expect(wrapper.find('.MainBreadcrumbs__item-link').hostNodes().at(2).prop('href')).toBe(
    '/examples/hello-world'
  )
  expect(wrapper.find('.MainBreadcrumbs__item-link').hostNodes().at(0).text()).toBe('~')
  expect(wrapper.find('.MainBreadcrumbs__item-link').hostNodes().at(1).text()).toBe('Examples')
  expect(wrapper.find('.MainBreadcrumbs__item-link').hostNodes().at(2).text()).toBe('Hello world')
  expect(wrapper.find('.MainBreadcrumbs__item-link').hostNodes().at(0).prop('className')).toBe(
    'MainBreadcrumbs__item-link'
  )
  expect(wrapper.find('.MainBreadcrumbs__item-link').hostNodes().at(1).prop('className')).toBe(
    'MainBreadcrumbs__item-link'
  )
  expect(wrapper.find('.MainBreadcrumbs__item-link').hostNodes().at(2).prop('className')).toBe(
    'MainBreadcrumbs__item-link MainBreadcrumbs__item-link--active'
  )
})
