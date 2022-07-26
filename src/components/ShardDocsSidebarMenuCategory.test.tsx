import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import CategoryNode from "./ShardDocsSidebarMenuCategory";
import contentTool from "../utils/contentTool";

const { items } = contentTool.parseContent([
  {
    type: 'category', 
    name: "Category",
    items: [{ type: 'document', name: "Document", document: <h1>Hello world</h1> }]
  }
]);

test("<CategoryNode /> renders correctly", () => {
  const wrapper = mount(
    <MemoryRouter>
      <CategoryNode item={items[0] as categoryItem} />
    </MemoryRouter>
  );

  expect(wrapper.find('ShardDocsSidebarMenuTree').exists()).toBe(true);

  wrapper.find('.shard-docs-menu-category-header a').first().simulate('click')

  expect(wrapper.find('ShardDocsSidebarMenuTree').exists()).toBe(false);
});