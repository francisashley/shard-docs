import React from 'react'
import { mount } from 'enzyme'
import CodeSampleShard from './CodeSampleShard'

const title = 'Hello world'
const repository = 'github.com'
const sourceCode = `
<HelloWorld />
`

test('<CodeSampleShard /> renders with default props', () => {
  const wrapper = mount(<CodeSampleShard />)
  expect(wrapper.find('CodeSampleShard').exists()).toBe(true)
})

test('<CodeSampleShard /> renders title', () => {
  const wrapper = mount(<CodeSampleShard title={title} />)
  expect(wrapper.find('.sd-CodeSampleShard__header').text()).toBe('Hello world')
})

test('<CodeSampleShard /> renders source code button when sourceCode provided', () => {
  const wrapper = mount(<CodeSampleShard sourceCode={sourceCode} />)
  expect(wrapper.find('.sd-CodeSampleShard__menu-link--code').hostNodes().exists()).toBe(true)
})

test('<CodeSampleShard /> hides source code button when sourceCode is empty', () => {
  const wrapper = mount(<CodeSampleShard />)
  expect(wrapper.find('.sd-CodeSampleShard__menu-link--repository').hostNodes().exists()).toBe(
    false
  )
})

test('<CodeSampleShard /> renders repository anchor when repository provided', () => {
  const wrapper = mount(<CodeSampleShard repository={repository} />)

  expect(wrapper.find('.sd-CodeSampleShard__menu-link--repository').hostNodes().exists()).toBe(true)
  expect(wrapper.find('.sd-CodeSampleShard__menu-link--repository').hostNodes().props().href).toBe(
    'github.com'
  )
})

test('<CodeSampleShard /> hides repository anchor when no repository is provided', () => {
  const wrapper = mount(<CodeSampleShard />)

  expect(wrapper.find('.sd-CodeSampleShard__menu-link').exists()).toBe(false)
})

test('<CodeSampleShard /> renders example', () => {
  const wrapper = mount(
    <CodeSampleShard>
      <h1>Hello world</h1>
    </CodeSampleShard>
  )

  expect(wrapper.find('.sd-CodeSampleShard__body h1').text()).toBe('Hello world')
})

test('<CodeSampleShard /> renders example in an iframe', () => {
  const wrapper = mount(
    <CodeSampleShard useIframe>
      <h1>Hello world</h1>
    </CodeSampleShard>
  )

  expect(wrapper.find('Frame').exists()).toBe(true)
})

test('<CodeSampleShard /> toggles sourceCode', () => {
  const wrapper = mount(
    <CodeSampleShard sourceCode={sourceCode}>
      <h1>Hello world</h1>
      <h2>Hello galaxy</h2>
    </CodeSampleShard>
  )

  expect(wrapper.find('.sd-CodeSampleShard__source-code').exists()).toBe(false)

  wrapper.find('.sd-CodeSampleShard__menu-link--code').hostNodes().simulate('click')

  expect(wrapper.find('.sd-CodeSampleShard__source-code').exists()).toBe(true)
})
