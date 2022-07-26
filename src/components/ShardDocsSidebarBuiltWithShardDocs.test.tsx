import React from "react";
import { mount } from "enzyme";
import BuiltWithShardDocs from "./ShardDocsSidebarBuiltWithShardDocs";

test("<BuiltWithShardDocs /> renders with default props", () => {
  const wrapper = mount(<BuiltWithShardDocs />)
  expect(wrapper.find('ShardDocsSidebarBuiltWithShardDocs').exists()).toBe(true)
});