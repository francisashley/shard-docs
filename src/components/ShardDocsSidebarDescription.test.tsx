import React from "react";
import { mount } from "enzyme";
import Description from "./ShardDocsSidebarDescription";

describe("<Description />", () => {
  it("renders description", () => {
    const wrapper = mount(<Description description="Hello world"/>)
    expect(wrapper.find('Description').text()).toBe("Hello world")
  });
});