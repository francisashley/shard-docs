import dataTools from "./dataTools";

const input = [
  { type: "page", name: "Doc A", content: null },
  { type: "page", name: "Doc B", content: null },
  { type: "page", name: "Doc C", content: null },
  {
    type: "category",
    name: "Category",
    items: [
      { type: "page", name: "Doc D", content: null },
      { type: "page", name: "Doc E", content: null }
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
          type: "page",
          path: "/doc-a",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { path: "/doc-a", name: "Doc A", isActive: false }
          ],
          content: null,
          isEmpty: true,
          isActive: false,
          depth: 1
        },
        {
          name: "Doc B",
          type: "page",
          path: "/doc-b",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { path: "/doc-b", name: "Doc B", isActive: false }
          ],
          content: null,
          isEmpty: true,
          isActive: false,
          depth: 1
        },
        {
          name: "Doc C",
          type: "page",
          path: "/doc-c",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { path: "/doc-c", name: "Doc C", isActive: false }
          ],
          content: null,
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
          type: "page",
          path: "/category/doc-d",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { path: "/category", name: "Category", isActive: false },
            { path: "/category/doc-d", name: "Doc D", isActive: false }
          ],
          content: null,
          isEmpty: true,
          isActive: false,
          depth: 1
        },
        {
          name: "Doc E",
          type: "page",
          path: "/category/doc-e",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { path: "/category", name: "Category", isActive: false },
            { path: "/category/doc-e", name: "Doc E", isActive: false }
          ],
          content: null,
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

test("dataTools() transforms data and returns pages in a flat array", () => {
  const data = dataTools.parse(input);
  const pages = dataTools.getPages(data);
  expect(pages).toStrictEqual([
    {
      name: "Doc A",
      type: "page",
      path: "/doc-a",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { path: "/doc-a", name: "Doc A", isActive: false }
      ],
      content: null,
      isEmpty: true,
      isActive: false,
      depth: 1
    },
    {
      name: "Doc B",
      type: "page",
      path: "/doc-b",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { path: "/doc-b", name: "Doc B", isActive: false }
      ],
      content: null,
      isEmpty: true,
      isActive: false,
      depth: 1
    },
    {
      name: "Doc C",
      type: "page",
      path: "/doc-c",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { path: "/doc-c", name: "Doc C", isActive: false }
      ],
      content: null,
      isEmpty: true,
      isActive: false,
      depth: 1
    },
    {
      name: "Doc D",
      type: "page",
      path: "/category/doc-d",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { path: "/category", name: "Category", isActive: false },
        { path: "/category/doc-d", name: "Doc D", isActive: false }
      ],
      content: null,
      isEmpty: true,
      isActive: false,
      depth: 1
    },
    {
      name: "Doc E",
      type: "page",
      path: "/category/doc-e",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { path: "/category", name: "Category", isActive: false },
        { path: "/category/doc-e", name: "Doc E", isActive: false }
      ],
      content: null,
      isEmpty: true,
      isActive: false,
      depth: 1
    }
  ])
});

test("dataTools.filterPages() filters correctly", () => {
  const pages = [
    {
      name: "Doc A",
      type: "page",
      path: "/doc-a",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { name: "Doc A", path: "/doc-a", isActive: false }
      ],
      content: null,
      isEmpty: true
    },
    {
      name: "Doc B",
      type: "page",
      path: "/doc-b",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { name: "Doc B", path: "/doc-b", isActive: false }
      ],
      content: null,
      isEmpty: true
    }
  ];

  expect(dataTools.filterPages(pages as page[])).toStrictEqual([
    {
      name: "Doc A",
      type: "page",
      path: "/doc-a",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { name: "Doc A", path: "/doc-a", isActive: false }
      ],
      content: null,
      isEmpty: true
    },
    {
      name: "Doc B",
      type: "page",
      path: "/doc-b",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { name: "Doc B", path: "/doc-b", isActive: false }
      ],
      content: null,
      isEmpty: true
    }
  ])

  expect(dataTools.filterPages(pages as page[], '/doc-a')).toStrictEqual([
    {
      name: "Doc A",
      type: "page",
      path: "/doc-a",
      breadcrumbs: [
        { path: "/", name: "~", isActive: false },
        { name: "Doc A", path: "/doc-a", isActive: false }
      ],
      content: null,
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
          type: "page",
          path: "/doc-a",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc A", path: "/doc-a", isActive: false }],
          content: null,
          isEmpty: true
        },
        {
          name: "Doc B",
          type: "page",
          path: "/doc-b",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc B", path: "/doc-b", isActive: false }
          ],
          content: null,
          isEmpty: true
        },
        {
          name: "Doc C",
          type: "page",
          path: "/doc-c",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc C", path: "/doc-c", isActive: false }
          ],
          content: null,
          isEmpty: true
        }
      ]
    }
  ];

  expect(dataTools.setActiveMenuItem(items as data, '/doc-b')).toStrictEqual([
    {
      name: null,
      type: "category",
      path: '/',
      isActive: false,
      items: [
        {
          name: "Doc A",
          type: "page",
          path: "/doc-a",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc A", path: "/doc-a", isActive: false }
          ],
          content: null,
          isEmpty: true,
          isActive: false
        },
        {
          name: "Doc B",
          type: "page",
          path: "/doc-b",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc B", path: "/doc-b", isActive: false }
          ],
          content: null,
          isEmpty: true,
          isActive: true
        },
        {
          name: "Doc C",
          type: "page",
          path: "/doc-c",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc C", path: "/doc-c", isActive: false }
          ],
          content: null,
          isEmpty: true,
          isActive: false
        }
      ]
    }
  ])
  expect(dataTools.setActiveMenuItem(items as data, '/doc-z')).toStrictEqual([
    {
      name: null,
      type: "category",
      path: "/",
      isActive: false,
      items: [
        {
          name: "Doc A",
          type: "page",
          path: "/doc-a",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc A", path: "/doc-a", isActive: false }
          ],
          content: null,
          isEmpty: true,
          isActive: false
        },
        {
          name: "Doc B",
          type: "page",
          path: "/doc-b",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc B", path: "/doc-b", isActive: false }
          ],
          content: null,
          isEmpty: true,
          isActive: false
        },
        {
          name: "Doc C",
          type: "page",
          path: "/doc-c",
          breadcrumbs: [
            { path: "/", name: "~", isActive: false },
            { name: "Doc C", path: "/doc-c", isActive: false }
          ],
          content: null,
          isEmpty: true,
          isActive: false
        }
      ]
    }
  ])
});

test("dataTools.setActiveCrumb() sets active crumb correctly", () => {
  const page = {
    name: "Hello universe",
    type: "page",
    path: "/hello-universe",
    breadcrumbs: [
      { name: "~", path: "/" },
      { name: "Hello", path: "/hello" },
      { name: "Planet", path: "/hello/planet" },
      { name: "Galaxy", path: "/hello/planet/galaxy" },
      { name: "Universe", path: "/hello/planet/galaxy/universe" }
    ],
    content: null,
    isEmpty: true
  };

  expect(dataTools.setActiveCrumb(page as page)).toStrictEqual({
    name: "Hello universe",
    type: "page",
    path: "/hello-universe",
    breadcrumbs: [
      { name: "~", path: "/", isActive: false },
      { name: "Hello", path: "/hello", isActive: false },
      { name: "Planet", path: "/hello/planet", isActive: false },
      { name: "Galaxy", path: "/hello/planet/galaxy", isActive: false },
      { name: "Universe", path: "/hello/planet/galaxy/universe", isActive: false }
    ],
    content: null,
    isEmpty: true
  });

  expect(dataTools.setActiveCrumb(page as page, "/hello")).toStrictEqual({
    name: "Hello universe",
    type: "page",
    path: "/hello-universe",
    breadcrumbs: [
      { name: "~", path: "/", isActive: false },
      { name: "Hello", path: "/hello", isActive: true },
      { name: "Planet", path: "/hello/planet", isActive: false },
      { name: "Galaxy", path: "/hello/planet/galaxy", isActive: false },
      { name: "Universe", path: "/hello/planet/galaxy/universe", isActive: false }
    ],
    content: null,
    isEmpty: true
  });

  expect(dataTools.setActiveCrumb(page as page, "/hello/planet")).toStrictEqual({
    name: "Hello universe",
    type: "page",
    path: "/hello-universe",
    breadcrumbs: [
      { name: "~", path: "/", isActive: false },
      { name: "Hello", path: "/hello", isActive: false },
      { name: "Planet", path: "/hello/planet", isActive: true },
      { name: "Galaxy", path: "/hello/planet/galaxy", isActive: false },
      { name: "Universe", path: "/hello/planet/galaxy/universe", isActive: false }
    ],
    content: null,
    isEmpty: true
  });

  expect(dataTools.setActiveCrumb(page as page, "/hello/planet/galaxy")).toStrictEqual({
    name: "Hello universe",
    type: "page",
    path: "/hello-universe",
    breadcrumbs: [
      { name: "~", path: "/", isActive: false },
      { name: "Hello", path: "/hello", isActive: false },
      { name: "Planet", path: "/hello/planet", isActive: false },
      { name: "Galaxy", path: "/hello/planet/galaxy", isActive: true },
      { name: "Universe", path: "/hello/planet/galaxy/universe", isActive: false }
    ],
    content: null,
    isEmpty: true
  });

  expect(dataTools.setActiveCrumb(page as page, "/hello/planet/galaxy/universe")).toStrictEqual({
    name: "Hello universe",
    type: "page",
    path: "/hello-universe",
    breadcrumbs: [
      { name: "~", path: "/", isActive: false },
      { name: "Hello", path: "/hello", isActive: false },
      { name: "Planet", path: "/hello/planet", isActive: false },
      { name: "Galaxy", path: "/hello/planet/galaxy", isActive: false },
      { name: "Universe", path: "/hello/planet/galaxy/universe", isActive: true }
    ],
    content: null,
    isEmpty: true
  });
});
