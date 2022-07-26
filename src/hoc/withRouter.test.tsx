import React from "react";
import { mount } from "enzyme";
import withRouter from "./withRouter";
import ShardDocs, { ShardDocsProps } from "../components/ShardDocs";

describe("withRouter", () => {
  it("renders with default props", () => {
    const App = withRouter<ShardDocsProps>(ShardDocs);
    const wrapper = mount(<App />);

    expect(wrapper.find('HashRouter').exists()).toBe(true);
  });

  it("can render BrowserRouter", () => {
    const App = withRouter<ShardDocsProps>(ShardDocs);
    const wrapper = mount(<App useBrowserRouter={true} />);

    expect(wrapper.find('BrowserRouter').exists()).toBe(true);
  });
});
