import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import Document from "./ShardDocsMainDocument";

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

it("<Document /> renders with default props", () => {
  mount(<Document />);
});

it("<Document /> renders breadcrumbs", () => {
  const wrapper = mount(
    <MemoryRouter>
      <Document breadcrumbs={breadcrumbs} />
    </MemoryRouter>
  );

  expect(wrapper.find('.shard-docs-breadcrumbs a').exists()).toBe(true);
});

it("<Document /> renders document", () => {
  const wrapper = mount(
    <MemoryRouter>
      <Document document={document} />
    </MemoryRouter>
  );

  expect(wrapper.find('.shard-docs-document-body').exists()).toBe(true);
  expect(wrapper.find('.shard-docs-document-body h1').text()).toBe('Hello earth!');
  expect(wrapper.find('.shard-docs-document-body h2').text()).toBe('Hello galaxy!');
  expect(wrapper.find('.shard-docs-document-body h3').text()).toBe('Hello universe!');
});
