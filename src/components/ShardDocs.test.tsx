import React from "react";
import { mount } from "enzyme";
import ShardDocs from "./ShardDocs";

const title = "App title";
const description = "App description.";
const content = [
  { type: 'document', name: "Doc A", document: <h1>Doc A</h1> },
  { type: 'document', name: "Doc B", document: <h1>Doc B</h1> }
];

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


test("<ShardDocs /> renders with default props", () => {
  const wrapper = mountShardDocs();

  expect(wrapper.exists()).toBe(true);
});

test("<ShardDocs /> renders with props", () => {
  const wrapper = mountShardDocs({ title, description, content });

  // Renders sidebar
  expect(wrapper.find('ShardDocsSidebar').exists()).toBe(true);

  // Renders app title
  expect(wrapper.find('ShardDocsSidebar .shard-docs-header-title h2').text()).toBe(title);

  // Renders app description
  expect(wrapper.find('ShardDocsSidebar .shard-docs-description').text()).toBe(description);

  // Renders menu
  expect(wrapper.find('ShardDocsSidebar .shard-docs-menu ul li').exists()).toBe(true);

  // Renders sidebar footer
  expect(wrapper.find('ShardDocsSidebar .shard-docs-built-with-shard-docs').exists()).toBe(true);

  // Renders main
  expect(wrapper.find('ShardDocsMain').exists()).toBe(true);

  // Renders documents
  expect(wrapper.find('ShardDocsMain ShardDocsMainDocument').exists()).toBe(true);
});

test("<ShardDocs /> can hide sidebar footer", () => {
  const wrapper = mountShardDocs({ hideBuiltWithShardDocs: true });

  expect(wrapper.find('ShardDocsSidebar .shard-docs-built-with-shard-docs').exists()).toBe(false);
});
