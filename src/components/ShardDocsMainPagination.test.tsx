import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import Pagination from "./ShardDocsMainPagination";

const mountPagination = ({ prevPage, nextPage } = {} as {prevPage?:paginationPage, nextPage?:paginationPage}) => {
  return mount(
    <MemoryRouter>
      <Pagination prevPage={prevPage} nextPage={nextPage} />
    </MemoryRouter>
  )
};

test("<Pagination /> renders nothing", () => {
  const wrapper = mountPagination();

  expect(wrapper.find(".shard-docs-pagination a").length).toBe(0);
});

test("<Pagination /> renders prev page", () => {
  const wrapper = mountPagination({ prevPage: { name: "Prev", path: "/prev" } });

  expect(wrapper.find(".shard-docs-pagination a").length).toBe(1);
  expect(wrapper.find(".shard-docs-pagination .prev a").props().href).toBe("/prev");
  expect(wrapper.find(".shard-docs-pagination .prev a").text()).toBe("⟵ Prev");
});

test("<Pagination /> renders next page", () => {
  const wrapper = mountPagination({ nextPage: { name: "Next", path: "/next" } });

  expect(wrapper.find(".shard-docs-pagination a").length).toBe(1);
  expect(wrapper.find(".shard-docs-pagination .next a").props().href).toBe("/next");
  expect(wrapper.find(".shard-docs-pagination .next a").text()).toBe("Next ⟶");
});

test("<Pagination /> renders both pages", () => {
  const wrapper = mountPagination({
  prevPage: { name: "Prev", path: "/prev" },
  nextPage: { name: "Next", path: "/next" }
});

  expect(wrapper.find(".shard-docs-pagination a").length).toBe(2);
  expect(wrapper.find(".shard-docs-pagination .prev a").props().href).toBe("/prev");
  expect(wrapper.find(".shard-docs-pagination .prev a").text()).toBe("⟵ Prev");
  expect(wrapper.find(".shard-docs-pagination .next a").props().href).toBe("/next");
  expect(wrapper.find(".shard-docs-pagination .next a").text()).toBe("Next ⟶");
});
