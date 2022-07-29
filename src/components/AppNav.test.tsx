import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import AppNav from "./AppNav";
import dataTools from "../utils/dataTools";

const items = dataTools.parse([
  { type: 'document', name: "Doc A", document: <h1>Doc A</h1> }
]);

const mountAppNav = ({ items, showOnMobile } = {} as {items?: categoryItem[], showOnMobile?:boolean}) => {
  const onNavigate = jest.fn();
  const wrapper = mount(
    <MemoryRouter>
      <AppNav onNavigate={onNavigate} items={items} showOnMobile={showOnMobile} />
    </MemoryRouter>
  );

  return { wrapper, onNavigate }
}

test("<AppNav /> renders with default props", () => {
  const { wrapper } = mountAppNav();

  expect(wrapper.exists()).toBe(true)
});

test("<AppNav /> renders AppNav", () => {
  const { wrapper } = mountAppNav({ items } as { items: categoryItem[]});

  expect(wrapper.find('.sd-AppNav ul li').exists()).toBe(true)
});

test("<AppNav /> can show AppNav on mobile devices", () => {
  const { wrapper } = mountAppNav({ items, showOnMobile: true } as { items: categoryItem[]});

  expect((wrapper.find('.sd-AppNav--show').exists())).toBe(true)
});

test("<AppNav /> can show AppNav on mobile devices", () => {
  const { wrapper } = mountAppNav({ items, showOnMobile: false } as { items: categoryItem[]});

  expect((wrapper.find('.sd-AppNav--show').exists())).toBe(false)
});

test("<AppNav /> calls onNavigate", () => {
  const { wrapper, onNavigate } = mountAppNav({ items } as { items: categoryItem[]});

  wrapper.find('.sd-AppNav ul li a').first().simulate('click');

  expect(onNavigate.mock.calls.length).toBe(1)
});