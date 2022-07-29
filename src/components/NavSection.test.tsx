import React from "react";
import { mount } from "enzyme";
import NavSection from "./NavSection";
import contentTools from "../utils/dataTools";
import { MemoryRouter } from "react-router-dom";

let items = contentTools.parse([
  {
    type: 'category',
    name: "Essentials",
    items: [
      { type: 'page', name: "Get started", content: <h1>Get started</h1> }
    ]
  },
  {
    type: 'category',
    name: "Examples",
    items: [
      { type: 'page', name: "Hello world", content: <h1>Hello world</h1> }
    ]
  },
  { type: 'page', name: "Doc A", content: <h1>Doc A</h1> }
]);

test("<NavSection /> renders first index correctly", () => {
  const onNavigateMock = jest.fn();
  const wrapper = mount(
    <MemoryRouter>
      <NavSection index={0} item={items[0] as category} onNavigate={onNavigateMock} />
    </MemoryRouter>
  );

  // first section is open by default
  expect(wrapper.find('NavSectionHeader').exists()).toBe(true)
  expect(wrapper.find('NavTree').exists()).toBe(true)

  // toggle closed, toggle open, toggle closed
  wrapper.find('NavSectionHeader a').simulate('click')
  expect(wrapper.find('NavTree').exists()).toBe(false)
  wrapper.find('NavSectionHeader a').simulate('click')
  expect(wrapper.find('NavTree').exists()).toBe(true)

  // calls onNavigate
  wrapper.find('NavTree NavPage a').first().simulate('click')
  expect(onNavigateMock.mock.calls.length).toBe(1)
});

test("<NavSection /> render indexes after first index correctly", () => {
  const wrapper = mount(
    <MemoryRouter>
      <NavSection index={1} item={items[1] as category} />
    </MemoryRouter>
  );

  // second section section is closed by default
  expect(wrapper.find('NavSectionHeader').exists()).toBe(true)
  expect(wrapper.find('NavTree').exists()).toBe(false)
});

test("<NavSection /> renders without title correctly", () => {
  const wrapper = mount(
    <MemoryRouter>
      <NavSection index={1} item={items[2] as category} />
    </MemoryRouter>
  );

  expect(wrapper.find('NavSectionHeader').exists()).toBe(false)
  expect(wrapper.find('NavTree').exists()).toBe(true)
});

