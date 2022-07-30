import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import AppNav from './AppNav'
import dataTools from '../utils/dataTools'

const items = dataTools.parse([{ name: 'Doc A', content: <h1>Doc A</h1> }])

const mountAppNav = (
  { items, showOnMobile } = {} as { items?: category[]; showOnMobile?: boolean }
) => {
  const onNavigate = jest.fn()
  const wrapper = mount(
    <MemoryRouter>
      <AppNav onNavigate={onNavigate} items={items} showOnMobile={showOnMobile} />
    </MemoryRouter>
  )

  return { wrapper, onNavigate }
}

test('<AppNav /> renders with default props', () => {
  const { wrapper } = mountAppNav()

  expect(wrapper.exists()).toBe(true)
})

test('<AppNav /> renders AppNav', () => {
  const { wrapper } = mountAppNav({ items } as { items: category[] })

  expect(wrapper.find('.AppNav ul li').exists()).toBe(true)
})

test('<AppNav /> can show AppNav on mobile devices', () => {
  const { wrapper } = mountAppNav({ items, showOnMobile: true } as { items: category[] })

  expect(wrapper.find('.AppNav--show').exists()).toBe(true)
})

test('<AppNav /> can show AppNav on mobile devices', () => {
  const { wrapper } = mountAppNav({ items, showOnMobile: false } as { items: category[] })

  expect(wrapper.find('.AppNav--show').exists()).toBe(false)
})

test('<AppNav /> calls onNavigate', () => {
  const { wrapper, onNavigate } = mountAppNav({ items } as { items: category[] })

  wrapper.find('.AppNav ul li a').first().simulate('click')

  expect(onNavigate.mock.calls.length).toBe(1)
})
