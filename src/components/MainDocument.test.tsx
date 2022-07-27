import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import MainDocument from "./MainDocument";

const breadcrumbs = [
  { name: "~", path: "/", isActive: false },
  { name: "Examples", path: "/examples", isActive: false },
  { name: "Hello world", path: "/examples/hello-world", isActive: false }
];

const document = <>
  <h1>Hello earth!</h1>
  <h2>Hello galaxy!</h2>
  <h3>Hello universe!</h3>
</>

it("<MainDocument /> renders with default props", () => {
  mount(<MainDocument />);
});

it("<MainDocument /> renders breadcrumbs", () => {
  const wrapper = mount(
    <MemoryRouter>
      <MainDocument breadcrumbs={breadcrumbs} />
    </MemoryRouter>
  );

  expect(wrapper.find('.sd-MainBreadcrumbs a').exists()).toBe(true);
});

it("<MainDocument /> renders document", () => {
  const wrapper = mount(
    <MemoryRouter>
      <MainDocument document={document} />
    </MemoryRouter>
  );

  expect(wrapper.find('.sd-MainDocument__body').exists()).toBe(true);
  expect(wrapper.find('.sd-MainDocument__body h1').text()).toBe('Hello earth!');
  expect(wrapper.find('.sd-MainDocument__body h2').text()).toBe('Hello galaxy!');
  expect(wrapper.find('.sd-MainDocument__body h3').text()).toBe('Hello universe!');
});
