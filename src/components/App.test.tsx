import React from "react";
import { mount } from "enzyme";
import App from "./App";

const title = "App title";
const content = [
  { type: 'page', name: "Doc A", content: <h1>Doc A</h1> },
  { type: 'page', name: "Doc B", content: <h1>Doc B</h1> }
];

const mountShardDocs = (options = {}) => {
  const { title, content = [], hideBuiltWithShardDocs } = options as {
    title?: string;
    content?: any[];
    hideBuiltWithShardDocs?: boolean;
  };
  return mount(
    <App
      title={title}
      content={content}
      hideBuiltWithShardDocs={hideBuiltWithShardDocs}
    />
  )
};


test("<App /> renders with default props", () => {
  const wrapper = mountShardDocs();

  expect(wrapper.exists()).toBe(true);
});

test("<App /> renders with props", () => {
  const wrapper = mountShardDocs({ title, content });

  // Renders sidebar
  expect(wrapper.find('AppSidebar').exists()).toBe(true);

  // Renders title
  expect(wrapper.find('AppSidebar .sd-AppHeader__title').text()).toBe(title);

  // Renders menu
  expect(wrapper.find('AppSidebar .sd-AppNav ul li').exists()).toBe(true);

  // Renders sidebar footer
  expect(wrapper.find('AppSidebar .sd-BuiltWithShardDocs').exists()).toBe(true);

  // Renders main
  expect(wrapper.find('AppMain').exists()).toBe(true);

  // Renders Page
  expect(wrapper.find('AppMain MainContent').exists()).toBe(true);
});

test("<App /> can hide sidebar footer", () => {
  const wrapper = mountShardDocs({ hideBuiltWithShardDocs: true });

  expect(wrapper.find('AppSidebar .sd-BuiltWithShardDocs').exists()).toBe(false);
});
