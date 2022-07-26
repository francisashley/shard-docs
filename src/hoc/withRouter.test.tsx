import React from "react";
import { mount } from "enzyme";
import withRouter from "./withRouter";
import ShardDocs, { ShardDocsProps } from "../components/ShardDocs";

test("withRouter: renders with default props", () => {
  const App = withRouter<ShardDocsProps>(ShardDocs);
  const wrapper = mount(<App />);

  expect(wrapper.find('HashRouter').exists()).toBe(true);
});

test("withRouter: can render BrowserRouter", () => {
  const App = withRouter<ShardDocsProps>(ShardDocs);
  const wrapper = mount(<App useBrowserRouter={true} />);

  expect(wrapper.find('BrowserRouter').exists()).toBe(true);
});