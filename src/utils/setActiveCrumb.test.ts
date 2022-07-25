import { contentItemDocument } from "./contentTool";
import setActiveCrumb from "./setActiveCrumb";

const document = {
  name: "Hello universe",
  type: "document",
  path: "/hello-universe",
  breadcrumbs: [
    { name: "~", path: "/" },
    { name: "Hello", path: "/hello" },
    { name: "Planet", path: "/hello/planet" },
    { name: "Galaxy", path: "/hello/planet/galaxy" },
    { name: "Universe", path: "/hello/planet/galaxy/universe" }
  ],
  document: null,
  isEmpty: true
};

test("setActiveCrumb() sets active crumb correctly", () => {
  expect(setActiveCrumb(document as contentItemDocument)).toStrictEqual({
    name: "Hello universe",
    type: "document",
    path: "/hello-universe",
    breadcrumbs: [
      { name: "~", path: "/", isActive: false },
      { name: "Hello", path: "/hello", isActive: false },
      { name: "Planet", path: "/hello/planet", isActive: false },
      { name: "Galaxy", path: "/hello/planet/galaxy", isActive: false },
      { name: "Universe", path: "/hello/planet/galaxy/universe", isActive: false }
    ],
    document: null,
    isEmpty: true
  });

  expect(setActiveCrumb(document as contentItemDocument, "/hello")).toStrictEqual({
    name: "Hello universe",
    type: "document",
    path: "/hello-universe",
    breadcrumbs: [
      { name: "~", path: "/", isActive: false },
      { name: "Hello", path: "/hello", isActive: true },
      { name: "Planet", path: "/hello/planet", isActive: false },
      { name: "Galaxy", path: "/hello/planet/galaxy", isActive: false },
      { name: "Universe", path: "/hello/planet/galaxy/universe", isActive: false }
    ],
    document: null,
    isEmpty: true
  });

  expect(setActiveCrumb(document as contentItemDocument, "/hello/planet")).toStrictEqual({
    name: "Hello universe",
    type: "document",
    path: "/hello-universe",
    breadcrumbs: [
      { name: "~", path: "/", isActive: false },
      { name: "Hello", path: "/hello", isActive: false },
      { name: "Planet", path: "/hello/planet", isActive: true },
      { name: "Galaxy", path: "/hello/planet/galaxy", isActive: false },
      { name: "Universe", path: "/hello/planet/galaxy/universe", isActive: false }
    ],
    document: null,
    isEmpty: true
  });

  expect(setActiveCrumb(document as contentItemDocument, "/hello/planet/galaxy")).toStrictEqual({
    name: "Hello universe",
    type: "document",
    path: "/hello-universe",
    breadcrumbs: [
      { name: "~", path: "/", isActive: false },
      { name: "Hello", path: "/hello", isActive: false },
      { name: "Planet", path: "/hello/planet", isActive: false },
      { name: "Galaxy", path: "/hello/planet/galaxy", isActive: true },
      { name: "Universe", path: "/hello/planet/galaxy/universe", isActive: false }
    ],
    document: null,
    isEmpty: true
  });

  expect(setActiveCrumb(document as contentItemDocument, "/hello/planet/galaxy/universe")).toStrictEqual({
    name: "Hello universe",
    type: "document",
    path: "/hello-universe",
    breadcrumbs: [
      { name: "~", path: "/", isActive: false },
      { name: "Hello", path: "/hello", isActive: false },
      { name: "Planet", path: "/hello/planet", isActive: false },
      { name: "Galaxy", path: "/hello/planet/galaxy", isActive: false },
      { name: "Universe", path: "/hello/planet/galaxy/universe", isActive: true }
    ],
    document: null,
    isEmpty: true
  });
});
