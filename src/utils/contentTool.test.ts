import contentTools from "./contentTool";

const content = contentTools.parseContent([
  { type: "document", name: "Doc A", document: null },
  { type: "document", name: "Doc B", document: null },
  { type: "document", name: "Doc C", document: null },
  {
    type: "category",
    name: "Category",
    items: [
      { type: "document", name: "Doc D", document: null },
      { type: "document", name: "Doc E", document: null }
    ]
  },
  { type: "link", name: "Github", url: "http://github.com", external: true },
  { type: "something", name: "This is a purposefully invalid type that should be removed from the output", someType:'some-type'}
] as any);

test("contentTools() transforms data and returns tree", () => {
  expect(content.items).toStrictEqual([
    {
      name: null,
      type: "category",
      depth: 0,
      items: [
        {
          name: "Doc A",
          type: "document",
          path: "/doc-a",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { path: "/doc-a", name: "Doc A", isActive: false }
          ],
          document: null,
          isEmpty: true,
          isActive: false,
          depth: 1
        },
        {
          name: "Doc B",
          type: "document",
          path: "/doc-b",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { path: "/doc-b", name: "Doc B", isActive: false }
          ],
          document: null,
          isEmpty: true,
          isActive: false,
          depth: 1
        },
        {
          name: "Doc C",
          type: "document",
          path: "/doc-c",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { path: "/doc-c", name: "Doc C", isActive: false }
          ],
          document: null,
          isEmpty: true,
          isActive: false,
          depth: 1
        }
      ]
    },
    {
      name: "Category",
      type: "category",
      path: "/category",
      isEmpty: false,
      isActive: false,
      depth: 0,
      items: [
        {
          name: "Doc D",
          type: "document",
          path: "/category/doc-d",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { path: "/category", name: "Category", isActive: false },
            { path: "/category/doc-d", name: "Doc D", isActive: false }
          ],
          document: null,
          isEmpty: true,
          isActive: false,
          depth: 1
        },
        {
          name: "Doc E",
          type: "document",
          path: "/category/doc-e",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { path: "/category", name: "Category", isActive: false },
            { path: "/category/doc-e", name: "Doc E", isActive: false }
          ],
          document: null,
          isEmpty: true,
          isActive: false,
          depth: 1
        }
      ]
    },
    {
      name: null,
      type: "category",
      items: [
        { name: "Github", type: "link", url: "http://github.com", external: true, depth: 1 }
      ],
      depth: 0
    }
  ])}
);

test("contentTools() transforms data and returns documents in a flat array", () =>
  expect(content.documents).toStrictEqual([
    {
      name: "Doc A",
      type: "document",
      path: "/doc-a",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { path: "/doc-a", name: "Doc A", isActive: false }
      ],
      document: null,
      isEmpty: true,
      isActive: false,
      depth: 1
    },
    {
      name: "Doc B",
      type: "document",
      path: "/doc-b",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { path: "/doc-b", name: "Doc B", isActive: false }
      ],
      document: null,
      isEmpty: true,
      isActive: false,
      depth: 1
    },
    {
      name: "Doc C",
      type: "document",
      path: "/doc-c",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { path: "/doc-c", name: "Doc C", isActive: false }
      ],
      document: null,
      isEmpty: true,
      isActive: false,
      depth: 1
    },
    {
      name: "Doc D",
      type: "document",
      path: "/category/doc-d",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { path: "/category", name: "Category", isActive: false },
        { path: "/category/doc-d", name: "Doc D", isActive: false }
      ],
      document: null,
      isEmpty: true,
      isActive: false,
      depth: 1
    },
    {
      name: "Doc E",
      type: "document",
      path: "/category/doc-e",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { path: "/category", name: "Category", isActive: false },
        { path: "/category/doc-e", name: "Doc E", isActive: false }
      ],
      document: null,
      isEmpty: true,
      isActive: false,
      depth: 1
    }
  ])
);
