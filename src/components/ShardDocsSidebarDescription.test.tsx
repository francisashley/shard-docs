import React from "react";
import { mount } from "enzyme";
import Description from "./ShardDocsSidebarDescription";

test("<Description /> renders description", () => {
  const wrapper = mount(<Description description="Hello world"/>)
  expect(wrapper.find('Description').text()).toBe("Hello world")
});
