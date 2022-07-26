import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ShardDocsSidebarMenuTree from "./ShardDocsSidebarMenuTree";
import contentTool from "../utils/contentTool";

const { items } = contentTool.parseContent([
  { type: 'document', name: "Doc A", document: <h1>Doc A</h1> },
  { type: 'document', name: "Doc B", document: <h1>Doc B</h1> },
  { type: 'document', name: "Doc C", document: <h1>Doc C</h1> },
  {
    type: 'category', 
    name: "Category",
    items: [
      { type: 'document', name: "Doc D", document: <h1>Doc D</h1> },
      { type: 'document', name: "Doc E", document: <h1>Doc E</h1> }
    ]
  },
  { type: 'link', name: "Github", url: "http://github.com", external: true }
]);

const mountMenuList = ({ items } = {} as { items: item[]}) => {
  const onNavigate = jest.fn();
  const wrapper = mount(
    <MemoryRouter>
      <ShardDocsSidebarMenuTree onNavigate={onNavigate} items={items} />
    </MemoryRouter>
  );

  return { wrapper, onNavigate }
}

test("<ShardDocsSidebarMenuTree /> renders with default props", () => {
  const { wrapper } = mountMenuList();

  expect(wrapper.exists()).toBe(true);
});

test("<ShardDocsSidebarMenuTree /> renders with items data", () => {
  const { wrapper } = mountMenuList({ items });

  // Renders discrete category
  expect(wrapper.find('ShardDocsSidebarMenuTree > ShardDocsSidebarMenuCategory').at(0).find('li').length).toBe(3);

  // Renders category
  expect(wrapper.find('ShardDocsSidebarMenuTree > ShardDocsSidebarMenuCategory').at(1).find('a').first().text()).toBe('Category');
  expect(wrapper.find('ShardDocsSidebarMenuTree > ShardDocsSidebarMenuCategory').at(1).find('a').length).toBe(3);

  // Renders external link
  expect(wrapper.find('ShardDocsSidebarMenuTree > ShardDocsSidebarMenuCategory').at(2).find('li a').props().href).toBe('http://github.com');
  expect(wrapper.find('ShardDocsSidebarMenuTree > ShardDocsSidebarMenuCategory').at(2).find('li a').text()).toBe('Github');

  // Renders document
  expect(wrapper.find('ShardDocsSidebarMenuTree > ShardDocsSidebarMenuCategory').at(0).find('li a').first().text()).toBe('Doc A');
  expect(wrapper.find('ShardDocsSidebarMenuTree > ShardDocsSidebarMenuCategory').at(0).find('li a').first().props().href).toBe('/doc-a');
});

test("<MenuTree /> calls onNavigate", () => {
  const { wrapper, onNavigate } = mountMenuList({ items });

  wrapper.find('ShardDocsSidebarMenuTree ul li a').first().simulate('click');

  expect(onNavigate.mock.calls.length).toBe(1)
});