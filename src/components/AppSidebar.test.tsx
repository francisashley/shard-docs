import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import AppSidebar from './AppSidebar'
import dataTools from '../utils/dataTools'

const title = 'App title'
const items = dataTools.parse([{ name: 'Doc A', content: <h1>Doc A</h1> }])

const mountSidebar = (
  options = {} as { title?: string; items?: category[]; hideBuiltWithShardDocs?: boolean }
) => {
  const { title, items, hideBuiltWithShardDocs } = options
  return mount(
    <MemoryRouter>
      <AppSidebar title={title} items={items} hideBuiltWithShardDocs={hideBuiltWithShardDocs} />
    </MemoryRouter>
  )
}

test('<AppSidebar /> renders with default props', () => {
  const wrapper = mountSidebar()

  expect(wrapper.exists()).toBe(true)
})

test('<AppSidebar /> renders app title', () => {
  const wrapper = mountSidebar({ title })

  expect(wrapper.find('.AppHeader__title').text()).toBe(title)
})

test('<AppSidebar /> renders menu', () => {
  const wrapper = mountSidebar({ items } as { items: category[] })

  expect(wrapper.find('.AppNav ul li').exists()).toBe(true)
})

test('<AppSidebar /> renders sidebar footer', () => {
  const wrapper = mountSidebar()

  expect(wrapper.find('.BuiltWithShardDocs').exists()).toBe(true)
})

test('<AppSidebar /> can hide sidebar footer', () => {
  const wrapper = mountSidebar({ hideBuiltWithShardDocs: true })

  expect(wrapper.find('.BuiltWithShardDocs').exists()).toBe(false)
})

test('<AppSidebar /> can toggle sidebar', () => {
  const wrapper = mountSidebar()

  expect(wrapper.find('.AppNav--show').exists()).toBe(false)
  wrapper.find('.AppHeader__toggle-btn').simulate('click')
  expect(wrapper.find('.AppNav--show').exists()).toBe(true)
})

test('<AppSidebar /> closes sidebar menu when navigating', () => {
  const wrapper = mountSidebar({ items } as { items: category[] })

  expect(wrapper.find('.AppNav--show').exists()).toBe(false)
  wrapper.find('.AppHeader__toggle-btn').simulate('click')
  expect(wrapper.find('.AppNav--show').exists()).toBe(true)
  wrapper.find('.AppNav NavPage a').simulate('click')
  expect(wrapper.find('.AppNav--show').exists()).toBe(false)
})
