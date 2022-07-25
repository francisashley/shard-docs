import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import CategoryNode from "./ShardDocsSidebarCategoryNode";
import contentTool from "../utils/contentTool";

const { tree } = contentTool.parseContent([
  {
    type: 'category', 
    name: "Category",
    items: [{ type: 'document', name: "Document", document: <h1>Hello world</h1> }]
  }
]);

test("<CategoryNode /> renders correctly", () => {
  const onNavigateMock = jest.fn();
  const wrapper = mount(
    <MemoryRouter>
      <CategoryNode node={tree[0] as categoryItem} />
    </MemoryRouter>
  );

  expect(wrapper.find('MenuTree').exists()).toBe(true);

  wrapper.find('.shard-docs-menu-category-header a').first().simulate('click')

  expect(wrapper.find('MenuTree').exists()).toBe(false);
});