import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import AppMain from "./AppMain";

const prevPage = { name: "Prev", path: "/prev" } as paginationPage;
const nextPage = { name: "Next", path: "/next" } as paginationPage;
const document =  {
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
} as documentItem;

const mountMain = (options: { prevPage?: paginationPage, nextPage?: paginationPage, document?: documentItem }) => {
  const { prevPage, nextPage, document = null} = options
  return mount(
    <MemoryRouter>
      <AppMain prevPage={prevPage} nextPage={nextPage} document={document} />
    </MemoryRouter>
  )
};

test("<Pagination /> renders Pagination", () => {
  const wrapper = mountMain({prevPage, nextPage});

  expect(wrapper.find("MainPagination").exists()).toBe(true);
});

test("<Pagination /> renders Document", () => {
  const wrapper = mountMain({ prevPage, nextPage, document });

  expect(wrapper.find("MainDocument").length).toBe(1);
});
