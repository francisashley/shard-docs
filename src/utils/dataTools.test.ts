import dataTools from "./dataTools";

const input = [
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
] as any;

test("dataTools() transforms data and returns tree", () => {
  const data = dataTools.parse(input);
  expect(data).toStrictEqual([
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

test("dataTools() transforms data and returns documents in a flat array", () => {
  const data = dataTools.parse(input);
  const documents = dataTools.getDocuments(data);
  expect(documents).toStrictEqual([
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
});

test("dataTools.filterDocuments() filters correctly", () => {
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

  expect(dataTools.filterDocuments(documents as documentItem[])).toStrictEqual([
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

  expect(dataTools.filterDocuments(documents as documentItem[], '/doc-a')).toStrictEqual([
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


test("dataTools.setActiveMenuItem() correctly sets isActive", () => {  
  const items = [
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

  expect(dataTools.setActiveMenuItem(items as item[], '/doc-b')).toStrictEqual([
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
  expect(dataTools.setActiveMenuItem(items as item[], '/doc-z')).toStrictEqual([
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

test("dataTools.setActiveCrumb() sets active crumb correctly", () => {
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

  expect(dataTools.setActiveCrumb(document as documentItem)).toStrictEqual({
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

  expect(dataTools.setActiveCrumb(document as documentItem, "/hello")).toStrictEqual({
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

  expect(dataTools.setActiveCrumb(document as documentItem, "/hello/planet")).toStrictEqual({
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

  expect(dataTools.setActiveCrumb(document as documentItem, "/hello/planet/galaxy")).toStrictEqual({
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

  expect(dataTools.setActiveCrumb(document as documentItem, "/hello/planet/galaxy/universe")).toStrictEqual({
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
