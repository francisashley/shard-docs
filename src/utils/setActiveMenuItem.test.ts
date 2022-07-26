import setActiveMenuItem from "./setActiveMenuItem";

const tree = [
  {
    name: null,
    type: "category",
    path: '/',
    items: [
      {
        name: "Doc A",
        type: "document",
        path: "/doc-a",
        breadcrumbs: [
          { path: "/", name: "~", isActive: false },
          { name: "Doc A", path: "/doc-a", isActive: false }],
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
      },
      {
        name: "Doc C",
        type: "document",
        path: "/doc-c",
        breadcrumbs: [
          { path: "/", name: "~", isActive: false },
          { name: "Doc C", path: "/doc-c", isActive: false }
        ],
        document: null,
        isEmpty: true
      }
    ]
  }
];

test("setActiveMenuItem() correctly sets isActive", () => {
  expect(setActiveMenuItem(tree as item[], '/doc-b')).toStrictEqual([
    {
      name: null,
      type: "category",
      path: '/',
      isActive: false,
      items: [
        {
          name: "Doc A",
          type: "document",
          path: "/doc-a",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc A", path: "/doc-a", isActive: false }
          ],
          document: null,
          isEmpty: true,
          isActive: false
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
          isEmpty: true,
          isActive: true
        },
        {
          name: "Doc C",
          type: "document",
          path: "/doc-c",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc C", path: "/doc-c", isActive: false }
          ],
          document: null,
          isEmpty: true,
          isActive: false
        }
      ]
    }
  ])
  expect(setActiveMenuItem(tree as item[], '/doc-z')).toStrictEqual([
    {
      name: null,
      type: "category",
      path: "/",
      isActive: false,
      items: [
        {
          name: "Doc A",
          type: "document",
          path: "/doc-a",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc A", path: "/doc-a", isActive: false }
          ],
          document: null,
          isEmpty: true,
          isActive: false
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
          isEmpty: true,
          isActive: false
        },
        {
          name: "Doc C",
          type: "document",
          path: "/doc-c",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc C", path: "/doc-c", isActive: false }
          ],
          document: null,
          isEmpty: true,
          isActive: false
        }
      ]
    }
  ])
});
