import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import Sidebar from "./ShardDocsSidebar";
import contentTool from "../utils/contentTool";

const title = "App title";
const { items } = contentTool.parseContent([
  { type: 'document', name: "Doc A", document: <h1>Doc A</h1> }
]);

const mountSidebar = (options = {} as { title?: string, items?: categoryItem[], hideBuiltWithShardDocs?: boolean}) => {
  const { title, items, hideBuiltWithShardDocs } = options;
  return mount(
    <MemoryRouter>
      <Sidebar
        title={title}
        items={items}
        hideBuiltWithShardDocs={hideBuiltWithShardDocs}
      />
    </MemoryRouter>
  )
};

test("<Sidebar /> renders with default props", () => {
  const wrapper = mountSidebar();

  expect(wrapper.exists()).toBe(true);
});

test("<Sidebar /> renders app title", () => {
  const wrapper = mountSidebar({ title });

  expect(wrapper.find('.shard-docs-header-title h2').text()).toBe(title);
});

test("<Sidebar /> renders menu", () => {
  const wrapper = mountSidebar({ items } as { items: categoryItem[] });

  expect(wrapper.find('.shard-docs-menu ul li').exists()).toBe(true);
});

test("<Sidebar /> renders sidebar footer", () => {
  const wrapper = mountSidebar();

  expect(wrapper.find('.shard-docs-built-with-shard-docs').exists()).toBe(true);
});

test("<Sidebar /> can hide sidebar footer", () => {
  const wrapper = mountSidebar({ hideBuiltWithShardDocs: true });

  expect(wrapper.find('.shard-docs-built-with-shard-docs').exists()).toBe(false);
});

test("<Sidebar /> can toggle sidebar", () => {
  const wrapper = mountSidebar();

  expect((wrapper.find('[data-show-on-mobile]').props() as any)['data-show-on-mobile']).toBe(false)
  wrapper.find('.shard-docs-header-toggle').simulate('click')
  expect((wrapper.find('[data-show-on-mobile]').props() as any)['data-show-on-mobile']).toBe(true)
});

test("<Sidebar /> closes sidebar menu when navigating", () => {
  const wrapper = mountSidebar({ items } as { items: categoryItem[] });

  expect((wrapper.find('[data-show-on-mobile]').props() as any)['data-show-on-mobile']).toBe(false)
  wrapper.find('.shard-docs-header-toggle').simulate('click')
  expect((wrapper.find('[data-show-on-mobile]').props() as any)['data-show-on-mobile']).toBe(true)
  wrapper.find('.shard-docs-menu ShardDocsSidebarMenuDocument a').simulate('click')
  expect((wrapper.find('[data-show-on-mobile]').props() as any)['data-show-on-mobile']).toBe(false)
});