import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import Main from "./ShardDocsMain";

const pagination = {
  prev: { name: "Prev", path: "/prev" },
  next: { name: "Next", path: "/next" }
};

const documents = [
  {
    type: 'document',
    breadcrumbs: [
      { path: "/", name: "~", isActive: false },
      { path: "/examples", name: "Examples", isActive: true },
      { path: "/examples/hello-world", name: "Hello world", isActive: false }
    ],
    document: (
      <>
        <h1>Hello earth!</h1>,
        <h2>Hello galaxy!</h2>,
        <h3>Hello universe!</h3>,
      </>
    )
  }
];

describe("<Pagination />", () => {
  const mountMain = (pagination, documents = []) => {
    return mount(
      <MemoryRouter>
        <Main pagination={pagination} documents={documents} />
      </MemoryRouter>
    )
  };

  it("renders Pagination", () => {
    const wrapper = mountMain(pagination);

    expect(wrapper.find("Pagination").exists()).toBe(true);
  });

  it("renders Document", () => {
    const wrapper = mountMain(pagination, documents);

    expect(wrapper.find("Document").length).toBe(1);
  });
});
