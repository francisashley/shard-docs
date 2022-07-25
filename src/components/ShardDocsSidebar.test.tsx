import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import Sidebar from "./ShardDocsSidebar";
import contentTool from "../utils/contentTool";

const title = "App title";
const description = "App description.";
const { tree } = contentTool.parseContent([
  { type: 'document', name: "Doc A", document: <h1>Doc A</h1> }
]);

describe("<Sidebar />", () => {
  const mountSidebar = (options = {} as { title?: string, description?: string, tree?: categoryItem[], hideBuiltWithShardDocs?: boolean}) => {
    const { title, description, tree, hideBuiltWithShardDocs } = options;
    return mount(
      <MemoryRouter>
        <Sidebar
          title={title}
          description={description}
          tree={tree}
          hideBuiltWithShardDocs={hideBuiltWithShardDocs}
        />
      </MemoryRouter>
    )
  };

  it("renders with default props", () => {
    const wrapper = mountSidebar();

    expect(wrapper.exists()).toBe(true);
  });

  it("renders app title", () => {
    const wrapper = mountSidebar({ title });

    expect(wrapper.find('.shard-docs-header-title h2').text()).toBe(title);
  });

  it("renders app description", () => {
    const wrapper = mountSidebar({ description });

    expect(wrapper.find('.shard-docs-description').text()).toBe(description);
  });

  it("renders menu", () => {
    const wrapper = mountSidebar({ tree } as { tree: categoryItem[] });

    expect(wrapper.find('.shard-docs-menu ul li').exists()).toBe(true);
  });

  it("renders sidebar footer", () => {
    const wrapper = mountSidebar();

    expect(wrapper.find('.shard-docs-built-with-shard-docs').exists()).toBe(true);
  });

  it("can hide sidebar footer", () => {
    const wrapper = mountSidebar({ hideBuiltWithShardDocs: true });

    expect(wrapper.find('.shard-docs-built-with-shard-docs').exists()).toBe(false);
  });

  it("can toggle sidebar", () => {
    const wrapper = mountSidebar();

    expect((wrapper.find('[data-show-on-mobile]').props() as any)['data-show-on-mobile']).toBe(false)
    wrapper.find('.shard-docs-header-toggle').simulate('click')
    expect((wrapper.find('[data-show-on-mobile]').props() as any)['data-show-on-mobile']).toBe(true)
  });

  it("closes sidebar menu when navigating", () => {
    const wrapper = mountSidebar({ tree } as { tree: categoryItem[] });

    expect((wrapper.find('[data-show-on-mobile]').props() as any)['data-show-on-mobile']).toBe(false)
    wrapper.find('.shard-docs-header-toggle').simulate('click')
    expect((wrapper.find('[data-show-on-mobile]').props() as any)['data-show-on-mobile']).toBe(true)
    wrapper.find('.shard-docs-menu DocumentNode a').simulate('click')
    expect((wrapper.find('[data-show-on-mobile]').props() as any)['data-show-on-mobile']).toBe(false)
  });
});
