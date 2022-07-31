import dataTools from './dataTools'

const input = [
  { name: 'Doc A', content: null },
  { name: 'Doc B', content: null },
  { name: 'Doc C', content: null },
  {
    name: 'Category',
    content: [
      { name: 'Doc D', content: null },
      { name: 'Doc E', content: null },
    ],
  },
  { name: 'Github', content: 'http://github.com' },
  { name: 'This is an invalid type and should not appear in the output' },
] as any

test('dataTools() transforms data and returns tree', () => {
  const data = dataTools.parse(input)
  expect(data).toStrictEqual([
    {
      name: 'Doc A',
      type: 'page',
      path: '/doc-a',
      content: null,
      isActive: false,
    },
    {
      name: 'Doc B',
      type: 'page',
      path: '/doc-b',
      content: null,
      isActive: false,
    },
    {
      name: 'Doc C',
      type: 'page',
      path: '/doc-c',
      content: null,
      isActive: false,
    },
    {
      name: 'Category',
      type: 'category',
      path: '/category',
      isActive: false,
      items: [
        {
          name: 'Doc D',
          type: 'page',
          path: '/category/doc-d',
          content: null,
          isActive: false,
        },
        {
          name: 'Doc E',
          type: 'page',
          path: '/category/doc-e',
          content: null,
          isActive: false,
        },
      ],
    },
    { name: 'Github', type: 'link', url: 'http://github.com', isExternal: true },
  ])
})

test('dataTools() transforms data and returns pages in a flat array', () => {
  const data = dataTools.parse(input)
  const pages = dataTools.getPages(data)
  expect(pages).toStrictEqual([
    {
      name: 'Doc A',
      type: 'page',
      path: '/doc-a',
      content: null,
      isActive: false,
    },
    {
      name: 'Doc B',
      type: 'page',
      path: '/doc-b',
      content: null,
      isActive: false,
    },
    {
      name: 'Doc C',
      type: 'page',
      path: '/doc-c',
      content: null,
      isActive: false,
    },
    {
      name: 'Doc D',
      type: 'page',
      path: '/category/doc-d',
      content: null,
      isActive: false,
    },
    {
      name: 'Doc E',
      type: 'page',
      path: '/category/doc-e',
      content: null,
      isActive: false,
    },
  ])
})

test('dataTools.filterPages() filters correctly', () => {
  const pages = [
    {
      name: 'Doc A',
      type: 'page',
      path: '/doc-a',
      content: null,
    },
    {
      name: 'Doc B',
      type: 'page',
      path: '/doc-b',
      content: null,
    },
  ]

  expect(dataTools.filterPages(pages as page[])).toStrictEqual([
    {
      name: 'Doc A',
      type: 'page',
      path: '/doc-a',
      content: null,
    },
    {
      name: 'Doc B',
      type: 'page',
      path: '/doc-b',
      content: null,
    },
  ])

  expect(dataTools.filterPages(pages as page[], '/doc-a')).toStrictEqual([
    {
      name: 'Doc A',
      type: 'page',
      path: '/doc-a',
      content: null,
    },
  ])
})

test('dataTools.setActiveMenuItem() correctly sets isActive', () => {
  const items = [
    {
      name: 'Doc A',
      type: 'page',
      path: '/doc-a',
      content: null,
    },
    {
      name: 'Doc B',
      type: 'page',
      path: '/doc-b',
      content: null,
    },
    {
      name: 'Doc C',
      type: 'page',
      path: '/doc-c',
      content: null,
    },
  ]

  expect(dataTools.setActiveMenuItem(items as data, '/doc-b')).toStrictEqual([
    {
      name: 'Doc A',
      type: 'page',
      path: '/doc-a',
      content: null,
      isActive: false,
    },
    {
      name: 'Doc B',
      type: 'page',
      path: '/doc-b',
      content: null,
      isActive: true,
    },
    {
      name: 'Doc C',
      type: 'page',
      path: '/doc-c',
      content: null,
      isActive: false,
    },
  ])
  expect(dataTools.setActiveMenuItem(items as data, '/doc-z')).toStrictEqual([
    {
      name: 'Doc A',
      type: 'page',
      path: '/doc-a',
      content: null,
      isActive: false,
    },
    {
      name: 'Doc B',
      type: 'page',
      path: '/doc-b',
      content: null,
      isActive: false,
    },
    {
      name: 'Doc C',
      type: 'page',
      path: '/doc-c',
      content: null,
      isActive: false,
    },
  ])
})
