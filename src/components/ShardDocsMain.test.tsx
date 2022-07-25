import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import Main from "./ShardDocsMain";

const prevPage = { name: "Prev", path: "/prev" } as paginationPage;
const nextPage = { name: "Next", path: "/next" } as paginationPage;
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
] as contentItemDocument[];

describe("<Pagination />", () => {
  const mountMain = (options: { prevPage?: paginationPage, nextPage?: paginationPage, documents?: contentItemDocument[] }) => {
    const { prevPage, nextPage, documents = []} = options
    return mount(
      <MemoryRouter>
        <Main prevPage={prevPage} nextPage={nextPage} documents={documents} />
      </MemoryRouter>
    )
  };

  it("renders Pagination", () => {
    const wrapper = mountMain({prevPage, nextPage});

    expect(wrapper.find("Pagination").exists()).toBe(true);
  });

  it("renders Document", () => {
    const wrapper = mountMain({prevPage, nextPage, documents});

    expect(wrapper.find("Document").length).toBe(1);
  });
});
