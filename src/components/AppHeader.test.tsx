import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import AppHeader from './AppHeader'

test('<AppHeader /> renders with default props', () => {
  const wrapper = mount(
    <MemoryRouter>
      <AppHeader />
    </MemoryRouter>
  )

  expect(wrapper.find('.AppHeader').exists()).toBe(true)
})

test('<AppHeader /> renders title', () => {
  const wrapper = mount(
    <MemoryRouter>
      <AppHeader title="Hello world" />
    </MemoryRouter>
  )

  expect(wrapper.find('.AppHeader__title').text()).toBe('Hello world')
})

test('<AppHeader /> renders header link with custom basePath', () => {
  const wrapper = mount(
    <MemoryRouter>
      <AppHeader title="Hello world" basePath="/docs" />
    </MemoryRouter>
  )

  expect(wrapper.find('.AppHeader__title-link').hostNodes().props().href).toBe('/docs')
  expect(wrapper.find('.AppHeader').text()).toBe('Hello world')
})

test('<AppHeader /> renders toggle button', () => {
  const wrapper = mount(
    <MemoryRouter>
      <AppHeader />
    </MemoryRouter>
  )

  expect(wrapper.find('.AppHeader__toggle-btn').exists()).toBe(true)
})

test('<AppHeader /> calls onToggleMenu when sidebar toggle button clicked', () => {
  const onToggleMenu = jest.fn()
  const wrapper = mount(
    <MemoryRouter>
      <AppHeader onToggleMenu={onToggleMenu} />
    </MemoryRouter>
  )

  wrapper.find('.AppHeader__toggle-btn').simulate('click')

  expect(onToggleMenu.mock.calls[0].length).toBe(1)
})
