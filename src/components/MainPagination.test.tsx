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

  expect(wrapper.find(".sd-MainPagination__btn").hostNodes().length).toBe(0);
});

test("<MainPagination /> renders prev page", () => {
  const wrapper = mountPagination({ prevPage: { name: "Prev", path: "/prev" } });

  expect(wrapper.find(".sd-MainPagination__btn").hostNodes().length).toBe(1);
  expect(wrapper.find(".sd-MainPagination__btn--prev").hostNodes().props().href).toBe("/prev");
  expect(wrapper.find(".sd-MainPagination__btn--prev").hostNodes().text()).toBe("⟵ Prev");
});

test("<MainPagination /> renders next page", () => {
  const wrapper = mountPagination({ nextPage: { name: "Next", path: "/next" } });

  expect(wrapper.find(".sd-MainPagination__btn").hostNodes().length).toBe(1);
  expect(wrapper.find(".sd-MainPagination__btn--next").hostNodes().props().href).toBe("/next");
  expect(wrapper.find(".sd-MainPagination__btn--next").hostNodes().text()).toBe("Next ⟶");
});

test("<MainPagination /> renders both pages", () => {
  const wrapper = mountPagination({
  prevPage: { name: "Prev", path: "/prev" },
  nextPage: { name: "Next", path: "/next" }
});

  expect(wrapper.find(".sd-MainPagination__btn").hostNodes().length).toBe(2);
  expect(wrapper.find(".sd-MainPagination__btn--prev").hostNodes().props().href).toBe("/prev");
  expect(wrapper.find(".sd-MainPagination__btn--prev").hostNodes().text()).toBe("⟵ Prev");
  expect(wrapper.find(".sd-MainPagination__btn--next").hostNodes().props().href).toBe("/next");
  expect(wrapper.find(".sd-MainPagination__btn--next").hostNodes().text()).toBe("Next ⟶");
});
