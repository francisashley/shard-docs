import React from "react";
import { mount } from "enzyme";
import ShardDocs from "./ShardDocs";

const title = "App title";
const description = "App description.";
const content = [
  { type: 'document', name: "Doc A", document: <h1>Doc A</h1> },
  { type: 'document', name: "Doc B", document: <h1>Doc B</h1> }
];

describe("<ShardDocs />", () => {
  const mountShardDocs = (options = {}) => {
    const { title, description, content = [], hideBuiltWithShardDocs, useBrowserRouter } = options as {
      title?: string;
      description?: string;
      content?: any[];
      hideBuiltWithShardDocs?: boolean;
      useBrowserRouter?: boolean;
    };
    return mount(
      <ShardDocs
        title={title}
        description={description}
        content={content}
        hideBuiltWithShardDocs={hideBuiltWithShardDocs}
        useBrowserRouter={useBrowserRouter}
      />
    )
  };

  it("renders with default props", () => {
    const wrapper = mountShardDocs();

    expect(wrapper.exists()).toBe(true);
  });

  it("renders with props", () => {
    const wrapper = mountShardDocs({ title, description, content });

    // Renders sidebar
    expect(wrapper.find('Sidebar').exists()).toBe(true);

    // Renders app title
    expect(wrapper.find('Sidebar .shard-docs-header-title h2').text()).toBe(title);

    // Renders app description
    expect(wrapper.find('Sidebar .shard-docs-description').text()).toBe(description);

    // Renders menu
    expect(wrapper.find('Sidebar .shard-docs-menu ul li').exists()).toBe(true);

    // Renders sidebar footer
    expect(wrapper.find('Sidebar .shard-docs-built-with-shard-docs').exists()).toBe(true);

    // Renders main
    expect(wrapper.find('Main').exists()).toBe(true);

    // Renders documents
    expect(wrapper.find('Main Document').exists()).toBe(true);

    // Uses HashRouter
    expect(wrapper.find('HashRouter').exists()).toBe(true);
  });

  it("can hide sidebar footer", () => {
    const wrapper = mountShardDocs({ hideBuiltWithShardDocs: true });

    expect(wrapper.find('Sidebar .shard-docs-built-with-shard-docs').exists()).toBe(false);
  });

  it("can use BrowserRouter instead of HashRouter", () => {
    const wrapper = mountShardDocs({ useBrowserRouter: true });

    expect(wrapper.find('BrowserRouter').exists()).toBe(true);
  });
});
