import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Menu from "./ShardDocsSidebarMenu";
import contentTool from "../utils/contentTool";

const { items } = contentTool.parseContent([
  { type: 'document', name: "Doc A", document: <h1>Doc A</h1> }
]);

const mountMenu = ({ items, showOnMobile } = {} as {items?: categoryItem[], showOnMobile?:boolean}) => {
  const onNavigate = jest.fn();
  const wrapper = mount(
    <MemoryRouter>
      <Menu onNavigate={onNavigate} items={items} showOnMobile={showOnMobile} />
    </MemoryRouter>
  );

  return { wrapper, onNavigate }
}

test("<Menu /> renders with default props", () => {
  const { wrapper } = mountMenu();

  expect(wrapper.exists()).toBe(true)
});

test("<Menu /> renders Menu", () => {
  const { wrapper } = mountMenu({ items } as { items: categoryItem[]});

  expect(wrapper.find('.shard-docs-menu ul li').exists()).toBe(true)
});

test("<Menu /> can show menu on mobile devices", () => {
  const { wrapper } = mountMenu({ items, showOnMobile: true } as { items: categoryItem[]});

  expect((wrapper.find('.shard-docs-menu').props() as any)['data-show-on-mobile']).toBe(true)
});

test("<Menu /> can show menu on mobile devices", () => {
  const { wrapper } = mountMenu({ items, showOnMobile: false } as { items: categoryItem[]});

  expect((wrapper.find('.shard-docs-menu').props() as any)['data-show-on-mobile']).toBe(false)
});

test("<Menu /> calls onNavigate", () => {
  const { wrapper, onNavigate } = mountMenu({ items } as { items: categoryItem[]});

  wrapper.find('.shard-docs-menu ul li a').first().simulate('click');

  expect(onNavigate.mock.calls.length).toBe(1)
});