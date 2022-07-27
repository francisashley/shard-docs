import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import MainPagination from "./MainPagination";

const mountPagination = ({ prevPage, nextPage } = {} as {prevPage?:paginationPage, nextPage?:paginationPage}) => {
  return mount(
    <MemoryRouter>
      <MainPagination prevPage={prevPage} nextPage={nextPage} />
    </MemoryRouter>
  )
};

test("<MainPagination /> renders nothing", () => {
  const wrapper = mountPagination();

  expect(wrapper.find(".sd-MainPagination a").length).toBe(0);
});

test("<MainPagination /> renders prev page", () => {
  const wrapper = mountPagination({ prevPage: { name: "Prev", path: "/prev" } });

  expect(wrapper.find(".sd-MainPagination a").length).toBe(1);
  expect(wrapper.find(".sd-MainPagination .prev a").props().href).toBe("/prev");
  expect(wrapper.find(".sd-MainPagination .prev a").text()).toBe("⟵ Prev");
});

test("<MainPagination /> renders next page", () => {
  const wrapper = mountPagination({ nextPage: { name: "Next", path: "/next" } });

  expect(wrapper.find(".sd-MainPagination a").length).toBe(1);
  expect(wrapper.find(".sd-MainPagination .next a").props().href).toBe("/next");
  expect(wrapper.find(".sd-MainPagination .next a").text()).toBe("Next ⟶");
});

test("<MainPagination /> renders both pages", () => {
  const wrapper = mountPagination({
  prevPage: { name: "Prev", path: "/prev" },
  nextPage: { name: "Next", path: "/next" }
});

  expect(wrapper.find(".sd-MainPagination a").length).toBe(2);
  expect(wrapper.find(".sd-MainPagination .prev a").props().href).toBe("/prev");
  expect(wrapper.find(".sd-MainPagination .prev a").text()).toBe("⟵ Prev");
  expect(wrapper.find(".sd-MainPagination .next a").props().href).toBe("/next");
  expect(wrapper.find(".sd-MainPagination .next a").text()).toBe("Next ⟶");
});
