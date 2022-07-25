import React from "react";
import { mount } from "enzyme";
import MenuSection from "./ShardDocsSidebarMenuSection";
import contentTool, { contentItemCategory } from "../utils/contentTool";
import { MemoryRouter } from "react-router-dom";

let { tree } = contentTool.parseContent([
  {
    type: 'category',
    name: "Essentials",
    items: [
      { type: 'document', name: "Get started", document: <h1>Get started</h1> }
    ]
  },
  {
    type: 'category',
    name: "Examples",
    items: [
      { type: 'document', name: "Hello world", document: <h1>Hello world</h1> }
    ]
  },
  { type: 'document', name: "Doc A", document: <h1>Doc A</h1> }
]);

test("<MenuSection /> renders first index correctly", () => {
  const onNavigateMock = jest.fn();
  const wrapper = mount(
    <MemoryRouter>
      <MenuSection index={0} node={tree[0] as contentItemCategory} onNavigate={onNavigateMock} />
    </MemoryRouter>
  );

  // first section is open by default
  expect(wrapper.find('MenuSectionHeader').exists()).toBe(true)
  expect(wrapper.find('MenuTree').exists()).toBe(true)

  // toggle closed, toggle open, toggle closed
  wrapper.find('MenuSectionHeader a').simulate('click')
  expect(wrapper.find('MenuTree').exists()).toBe(false)
  wrapper.find('MenuSectionHeader a').simulate('click')
  expect(wrapper.find('MenuTree').exists()).toBe(true)

  // calls onNavigate
  wrapper.find('MenuTree DocumentNode a').first().simulate('click')
  expect(onNavigateMock.mock.calls.length).toBe(1)
});

test("<MenuSection /> render indexes after first index correctly", () => {
  const wrapper = mount(
    <MemoryRouter>
      <MenuSection index={1} node={tree[1] as contentItemCategory} />
    </MemoryRouter>
  );

  // second section section is closed by default
  expect(wrapper.find('MenuSectionHeader').exists()).toBe(true)
  expect(wrapper.find('MenuTree').exists()).toBe(false)
});

test("<MenuSection /> renders without title correctly", () => {
  const wrapper = mount(
    <MemoryRouter>
      <MenuSection index={1} node={tree[2] as contentItemCategory} />
    </MemoryRouter>
  );

  expect(wrapper.find('MenuSectionHeader').exists()).toBe(false)
  expect(wrapper.find('MenuTree').exists()).toBe(true)
});

