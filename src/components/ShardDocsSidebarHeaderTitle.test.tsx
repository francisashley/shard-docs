import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import HeaderTitle from "./ShardDocsSidebarHeaderTitle";

test("<HeaderTitle /> renders with default props", () => {
  const wrapper = mount(
    <MemoryRouter>
      <HeaderTitle/>
    </MemoryRouter>
  );

  expect(wrapper.find('.shard-docs-header-title').exists()).toBe(true)
});

test("<HeaderTitle /> renders title", () => {
  const wrapper = mount(
    <MemoryRouter>
      <HeaderTitle title="Hello world"/>
    </MemoryRouter>
  );

  expect(wrapper.find('.shard-docs-header-title h2').text()).toBe("Hello world")
  expect(wrapper.find('a.shard-docs-header-title').props().href).toBe("/")
});

it("renders link with custom path", () => {
  const wrapper = mount(
    <MemoryRouter>
      <HeaderTitle title="Hello world" path="/docs"/>
    </MemoryRouter>
  );

  expect(wrapper.find('.shard-docs-header-title h2').text()).toBe("Hello world")
  expect(wrapper.find('a.shard-docs-header-title').props().href).toBe("/docs")
});