import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import MainContent from './MainContent'

const content = (
  <>
    <h2>Hello earth!</h2>
    <h3>Hello galaxy!</h3>
    <h4>Hello universe!</h4>
  </>
)

it('<MainContent /> renders with default props', () => {
  mount(<MainContent />)
})

it('<MainContent /> renders content', () => {
  const wrapper = mount(
    <MemoryRouter>
      <MainContent content={content} />
    </MemoryRouter>
  )

  expect(wrapper.find('.MainContent__body').exists()).toBe(true)
  expect(wrapper.find('.MainContent__body h2').text()).toBe('Hello earth!')
  expect(wrapper.find('.MainContent__body h3').text()).toBe('Hello galaxy!')
  expect(wrapper.find('.MainContent__body h4').text()).toBe('Hello universe!')
})
