import fromContent from "./fromContent";

const content = fromContent([
  { type: "document", title: "Doc A", document: null },
  { type: "document", title: "Doc B", document: null },
  { type: "document", title: "Doc C", document: null },
  {
    type: "folder",
    title: "Folder",
    folder: [
      { type: "document", title: "Doc D", document: null },
      { type: "document", title: "Doc E", document: null }
    ]
  },
  { type: "external-link", title: "Github", externalLink: "http://github.com" },
  { type: "something", title: "This is a purposefully invalid type that should be removed from the output", someType:'some-type'}
]);

test("fromContent() transforms data and returns tree", () => {
  expect(content.tree).toStrictEqual([
    {
      title: null,
      type: "folder",
      depth: 0,
      folder: [
        {
          title: "Doc A",
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
          title: "Doc B",
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
          title: "Doc C",
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
      title: "Folder",
      type: "folder",
      path: "/folder",
      isEmpty: false,
      isActive: false,
      depth: 0,
      folder: [
        {
          title: "Doc D",
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
          title: "Doc E",
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
      title: null,
      type: "folder",
      folder: [
        { title: "Github", type: "external-link", link: "http://github.com", depth: 1 }
      ],
      depth: 0
    }
  ])}
);

test("fromContent() transforms data and returns documents in a flat array", () =>
  expect(content.documents).toStrictEqual([
    {
      title: "Doc A",
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
      title: "Doc B",
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
      title: "Doc C",
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
      title: "Doc D",
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
      title: "Doc E",
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
