import React from "react";
import { mount } from "enzyme";
import ShardDocs from "./ShardDocs";

const title = "App title";
const content = [
  { type: 'document', name: "Doc A", document: <h1>Doc A</h1> },
  { type: 'document', name: "Doc B", document: <h1>Doc B</h1> }
];

const mountShardDocs = (options = {}) => {
  const { title, content = [], hideBuiltWithShardDocs } = options as {
    title?: string;
    content?: any[];
    hideBuiltWithShardDocs?: boolean;
  };
  return mount(
    <ShardDocs
      title={title}
      content={content}
      hideBuiltWithShardDocs={hideBuiltWithShardDocs}
    />
  )
};


test("<ShardDocs /> renders with default props", () => {
  const wrapper = mountShardDocs();

  expect(wrapper.exists()).toBe(true);
});

test("<ShardDocs /> renders with props", () => {
  const wrapper = mountShardDocs({ title, content });

  // Renders sidebar
  expect(wrapper.find('ShardDocsSidebar').exists()).toBe(true);

  // Renders title
  expect(wrapper.find('ShardDocsSidebar .shard-docs-header-title h2').text()).toBe(title);

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
