import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import Pagination from "./ShardDocsMainPagination";

describe("<Pagination />", () => {
  const mountPagination = ({ prevPage = null, nextPage = null } = {}) => {
    return mount(
      <MemoryRouter>
        <Pagination prevPage={prevPage} nextPage={nextPage} />
      </MemoryRouter>
    )
  };

  it("renders nothing", () => {
    const wrapper = mountPagination({ prevPage: null, nextPage: null });

    expect(wrapper.find(".shard-docs-pagination a").length).toBe(0);
  });


  it("renders prev page", () => {
    const wrapper = mountPagination({ prevPage: { name: "Prev", path: "/prev" } });

    expect(wrapper.find(".shard-docs-pagination a").length).toBe(1);
    expect(wrapper.find(".shard-docs-pagination .prev a").props().href).toBe("/prev");
    expect(wrapper.find(".shard-docs-pagination .prev a").text()).toBe("⟵ Prev");
  });

  it("renders next page", () => {
    const wrapper = mountPagination({ nextPage: { name: "Next", path: "/next" } });

    expect(wrapper.find(".shard-docs-pagination a").length).toBe(1);
    expect(wrapper.find(".shard-docs-pagination .next a").props().href).toBe("/next");
    expect(wrapper.find(".shard-docs-pagination .next a").text()).toBe("Next ⟶");
  });

  it("renders both pages", () => {
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
});
