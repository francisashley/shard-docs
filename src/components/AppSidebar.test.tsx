import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import AppSidebar from "./AppSidebar";
import dataTools from "../utils/dataTools";

const title = "App title";
const { items } = dataTools.parseContent([
  { type: 'document', name: "Doc A", document: <h1>Doc A</h1> }
]);

const mountSidebar = (options = {} as { title?: string, items?: categoryItem[], hideBuiltWithShardDocs?: boolean}) => {
  const { title, items, hideBuiltWithShardDocs } = options;
  return mount(
    <MemoryRouter>
      <AppSidebar
        title={title}
        items={items}
        hideBuiltWithShardDocs={hideBuiltWithShardDocs}
      />
    </MemoryRouter>
  )
};

test("<AppSidebar /> renders with default props", () => {
  const wrapper = mountSidebar();

  expect(wrapper.exists()).toBe(true);
});

test("<AppSidebar /> renders app title", () => {
  const wrapper = mountSidebar({ title });

  expect(wrapper.find('.sd-AppHeader__title').text()).toBe(title);
});

test("<AppSidebar /> renders menu", () => {
  const wrapper = mountSidebar({ items } as { items: categoryItem[] });

  expect(wrapper.find('.sd-AppNav ul li').exists()).toBe(true);
});

test("<AppSidebar /> renders sidebar footer", () => {
  const wrapper = mountSidebar();

  expect(wrapper.find('.sd-BuiltWithShardDocs').exists()).toBe(true);
});

test("<AppSidebar /> can hide sidebar footer", () => {
  const wrapper = mountSidebar({ hideBuiltWithShardDocs: true });

  expect(wrapper.find('.sd-BuiltWithShardDocs').exists()).toBe(false);
});

test("<AppSidebar /> can toggle sidebar", () => {
  const wrapper = mountSidebar();

  expect((wrapper.find('.sd-AppNav--show').exists())).toBe(false)
  wrapper.find('.sd-AppHeader__toggle-btn').simulate('click')
  expect((wrapper.find('.sd-AppNav--show').exists())).toBe(true)
});

test("<AppSidebar /> closes sidebar menu when navigating", () => {
  const wrapper = mountSidebar({ items } as { items: categoryItem[] });

  expect((wrapper.find('.sd-AppNav--show').exists())).toBe(false)
  wrapper.find('.sd-AppHeader__toggle-btn').simulate('click')
  expect((wrapper.find('.sd-AppNav--show').exists())).toBe(true)
  wrapper.find('.sd-AppNav NavDocument a').simulate('click')
  expect((wrapper.find('.sd-AppNav--show').exists())).toBe(false)
});