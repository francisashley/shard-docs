import setActiveTreeNode from "./setActiveTreeNode";

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
          { link: "/", text: "~", isActive: false },
          { text: "Doc A", link: "/doc-a", isActive: false }],
        document: null,
        isEmpty: true
      },
      {
        name: "Doc B",
        type: "document",
        path: "/doc-b",
        breadcrumbs: [
          { link: "/", text: "~", isActive: false },
          { text: "Doc B", link: "/doc-b", isActive: false }
        ],
        document: null,
        isEmpty: true
      },
      {
        name: "Doc C",
        type: "document",
        path: "/doc-c",
        breadcrumbs: [
          { link: "/", text: "~", isActive: false },
          { text: "Doc C", link: "/doc-c", isActive: false }
        ],
        document: null,
        isEmpty: true
      }
    ]
  }
];

test("setActiveTreeNode() correctly sets isActive", () => {
  expect(setActiveTreeNode(tree, '/doc-b')).toStrictEqual([
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
            { link: "/", text: "~", isActive: false },
            { text: "Doc A", link: "/doc-a", isActive: false }
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
            { link: "/", text: "~", isActive: false },
            { text: "Doc B", link: "/doc-b", isActive: false }
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
            { link: "/", text: "~", isActive: false },
            { text: "Doc C", link: "/doc-c", isActive: false }
          ],
          document: null,
          isEmpty: true,
          isActive: false
        }
      ]
    }
  ])
  expect(setActiveTreeNode(tree, '/doc-z')).toStrictEqual([
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
            { link: "/", text: "~", isActive: false },
            { text: "Doc A", link: "/doc-a", isActive: false }
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
            { link: "/", text: "~", isActive: false },
            { text: "Doc B", link: "/doc-b", isActive: false }
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
            { link: "/", text: "~", isActive: false },
            { text: "Doc C", link: "/doc-c", isActive: false }
          ],
          document: null,
          isEmpty: true,
          isActive: false
        }
      ]
    }
  ])
});
