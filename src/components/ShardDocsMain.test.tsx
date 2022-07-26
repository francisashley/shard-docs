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
] as documentItem[];

const mountMain = (options: { prevPage?: paginationPage, nextPage?: paginationPage, documents?: documentItem[] }) => {
  const { prevPage, nextPage, documents = []} = options
  return mount(
    <MemoryRouter>
      <Main prevPage={prevPage} nextPage={nextPage} documents={documents} />
    </MemoryRouter>
  )
};

test("<Pagination /> renders Pagination", () => {
  const wrapper = mountMain({prevPage, nextPage});

  expect(wrapper.find("ShardDocsMainPagination").exists()).toBe(true);
});

test("<Pagination /> renders Document", () => {
  const wrapper = mountMain({prevPage, nextPage, documents});

  expect(wrapper.find("ShardDocsMainDocument").length).toBe(1);
});
