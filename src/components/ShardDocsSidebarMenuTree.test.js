import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import MenuTree from "./ShardDocsSidebarMenuTree";
import fromContent from "../adapters/fromContent";

const { tree } = fromContent([
  { type: 'document', title: "Doc A", document: <h1>Doc A</h1> },
  { type: 'document', title: "Doc B", document: <h1>Doc B</h1> },
  { type: 'document', title: "Doc C", document: <h1>Doc C</h1> },
  {
    type: 'folder', 
    title: "Folder",
    folder: [{ type: 'document', title: "Doc D", document: <h1>Doc D</h1> }, { title: "Doc E", document: <h1>Doc E</h1> }]
  },
  { type: 'external-link', title: "Github", externalLink: "http://github.com" }
]);

describe("<MenuTree />", () => {
  const mountMenuList = ({ tree } = {}) => {
    const onNavigate = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <MenuTree onNavigate={onNavigate} tree={tree} />
      </MemoryRouter>
    );

    return { wrapper, onNavigate }
  }

  it("renders with default props", () => {
    const { wrapper } = mountMenuList();

    expect(wrapper.exists()).toBe(true);
  });

  it("renders with tree data", () => {
    const { wrapper } = mountMenuList({ tree });

    // Renders discrete folder
    expect(wrapper.find('MenuTree > FolderNode').at(0).find('li').length).toBe(3);

    // Renders folder
    expect(wrapper.find('MenuTree > FolderNode').at(1).find('a').first().text()).toBe('Folder');
    expect(wrapper.find('MenuTree > FolderNode').at(1).find('a').length).toBe(3);

    // Renders external link
    expect(wrapper.find('MenuTree > FolderNode').at(2).find('li a').props().href).toBe('http://github.com');
    expect(wrapper.find('MenuTree > FolderNode').at(2).find('li a').text()).toBe('Github');

    // Renders document
    expect(wrapper.find('MenuTree > FolderNode').at(0).find('li a').first().text()).toBe('Doc A');
    expect(wrapper.find('MenuTree > FolderNode').at(0).find('li a').first().props().href).toBe('/doc-a');
  });

  it("calls onNavigate", () => {
    const { wrapper, onNavigate } = mountMenuList({ tree });
 
    wrapper.find('MenuTree ul li a').first().simulate('click');

    expect(onNavigate.mock.calls.length).toBe(1)
  });
});