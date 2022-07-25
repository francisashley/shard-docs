import { contentItemDocument } from "./contentTool";
import filterDocuments from "./filterDocuments";

const documents = [
  {
    name: "Doc A",
    type: "document",
    path: "/doc-a",
    breadcrumbs: [
      { path: "/", name: "~", isActive: false },
      { name: "Doc A", path: "/doc-a", isActive: false }
    ],
    document: null,
    isEmpty: true
  },
  {
    name: "Doc B",
    type: "document",
    path: "/doc-b",
    breadcrumbs: [
      { path: "/", name: "~", isActive: false },
      { name: "Doc B", path: "/doc-b", isActive: false }
    ],
    document: null,
    isEmpty: true
  }
];

test("filterDocuments() filters correctly", () => {
  expect(filterDocuments(documents as contentItemDocument[])).toStrictEqual([
    {
      name: "Doc A",
      type: "document",
      path: "/doc-a",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { name: "Doc A", path: "/doc-a", isActive: false }
      ],
      document: null,
      isEmpty: true
    },
    {
      name: "Doc B",
      type: "document",
      path: "/doc-b",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { name: "Doc B", path: "/doc-b", isActive: false }
      ],
      document: null,
      isEmpty: true
    }
  ])
  expect(filterDocuments(documents as contentItemDocument[], '/doc-a')).toStrictEqual([
    {
      name: "Doc A",
      type: "document",
      path: "/doc-a",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { name: "Doc A", path: "/doc-a", isActive: false }
      ],
      document: null,
      isEmpty: true
    }
  ])
});
