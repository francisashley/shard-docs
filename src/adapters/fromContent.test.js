import fromContent from "./fromContent";

const content = fromContent([
  { type: "document", name: "Doc A", document: null },
  { type: "document", name: "Doc B", document: null },
  { type: "document", name: "Doc C", document: null },
  {
    type: "folder",
    name: "Folder",
    items: [
      { type: "document", name: "Doc D", document: null },
      { type: "document", name: "Doc E", document: null }
    ]
  },
  { type: "external-link", name: "Github", externalLink: "http://github.com" },
  { type: "something", name: "This is a purposefully invalid type that should be removed from the output", someType:'some-type'}
]);

test("fromContent() transforms data and returns tree", () => {
  expect(content.tree).toStrictEqual([
    {
      name: null,
      type: "folder",
      depth: 0,
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
          isActive: false,
          depth: 1
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
          isActive: false,
          depth: 1
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
          isActive: false,
          depth: 1
        }
      ]
    },
    {
      name: "Folder",
      type: "folder",
      path: "/folder",
      isEmpty: false,
      isActive: false,
      depth: 0,
      items: [
        {
          name: "Doc D",
          type: "document",
          path: "/folder/doc-d",
          breadcrumbs: [
            { link: "/", text: "~", isActive: false },
            { text: "Folder", link: "/folder", isActive: false },
            { text: "Doc D", link: "/folder/doc-d", isActive: false }
          ],
          document: null,
          isEmpty: true,
          isActive: false,
          depth: 1
        },
        {
          name: "Doc E",
          type: "document",
          path: "/folder/doc-e",
          breadcrumbs: [
            { link: "/", text: "~", isActive: false },
            { text: "Folder", link: "/folder", isActive: false },
            { text: "Doc E", link: "/folder/doc-e", isActive: false }
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
      type: "folder",
      items: [
        { name: "Github", type: "external-link", link: "http://github.com", depth: 1 }
      ],
      depth: 0
    }
  ])}
);

test("fromContent() transforms data and returns documents in a flat array", () =>
  expect(content.documents).toStrictEqual([
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
      isActive: false,
      depth: 1
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
      isActive: false,
      depth: 1
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
      isActive: false,
      depth: 1
    },
    {
      name: "Doc D",
      type: "document",
      path: "/folder/doc-d",
      breadcrumbs: [
        { link: "/", text: "~", isActive: false },
        { text: "Folder", link: "/folder", isActive: false },
        { text: "Doc D", link: "/folder/doc-d", isActive: false }
      ],
      document: null,
      isEmpty: true,
      isActive: false,
      depth: 1
    },
    {
      name: "Doc E",
      type: "document",
      path: "/folder/doc-e",
      breadcrumbs: [
        { link: "/", text: "~", isActive: false },
        { text: "Folder", link: "/folder", isActive: false },
        { text: "Doc E", link: "/folder/doc-e", isActive: false }
      ],
      document: null,
      isEmpty: true,
      isActive: false,
      depth: 1
    }
  ])
);
