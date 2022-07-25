import { contentItemCategory, contentItemDocument, contentItemLink } from "./contentTool";
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

test("setActiveTreeNode() correctly sets isActive", () => {
  expect(setActiveTreeNode(tree as (contentItemCategory | contentItemDocument | contentItemLink)[], '/doc-b')).toStrictEqual([
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
  expect(setActiveTreeNode(tree as (contentItemCategory | contentItemDocument | contentItemLink)[], '/doc-z')).toStrictEqual([
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
