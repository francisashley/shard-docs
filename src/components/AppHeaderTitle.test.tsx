import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import AppHeaderTitle from "./AppHeaderTitle";

test("<AppHeaderTitle /> renders with default props", () => {
  const wrapper = mount(
    <MemoryRouter>
      <AppHeaderTitle/>
    </MemoryRouter>
  );

  expect(wrapper.find('.sd-AppHeaderTitle').exists()).toBe(true)
});

test("<AppHeaderTitle /> renders title", () => {
  const wrapper = mount(
    <MemoryRouter>
      <AppHeaderTitle title="Hello world"/>
    </MemoryRouter>
  );

  expect(wrapper.find('.sd-AppHeaderTitle h2').text()).toBe("Hello world")
  expect(wrapper.find('a.sd-AppHeaderTitle').props().href).toBe("/")
});

it("renders link with custom path", () => {
  const wrapper = mount(
    <MemoryRouter>
      <AppHeaderTitle title="Hello world" path="/docs"/>
    </MemoryRouter>
  );

  expect(wrapper.find('.sd-AppHeaderTitle h2').text()).toBe("Hello world")
  expect(wrapper.find('a.sd-AppHeaderTitle').props().href).toBe("/docs")
});