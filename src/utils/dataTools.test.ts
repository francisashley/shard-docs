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
      pageId: 0,
    },
    {
      name: 'Doc B',
      type: 'page',
      path: '/doc-b',
      content: null,
      isActive: false,
      pageId: 1,
    },
    {
      name: 'Doc C',
      type: 'page',
      path: '/doc-c',
      content: null,
      isActive: false,
      pageId: 2,
    },
    {
      name: 'Category',
      type: 'category',
      path: '/category',
      isActive: false,
      isExpanded: false,
      items: [
        {
          name: 'Doc D',
          type: 'page',
          path: '/category/doc-d',
          content: null,
          isActive: false,
          pageId: 3,
        },
        {
          name: 'Doc E',
          type: 'page',
          path: '/category/doc-e',
          content: null,
          isActive: false,
          pageId: 4,
        },
      ],
    },
    { name: 'Github', type: 'link', url: 'http://github.com', isExternal: false },
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
      pageId: 0,
    },
    {
      name: 'Doc B',
      type: 'page',
      path: '/doc-b',
      content: null,
      isActive: false,
      pageId: 1,
    },
    {
      name: 'Doc C',
      type: 'page',
      path: '/doc-c',
      content: null,
      isActive: false,
      pageId: 2,
    },
    {
      name: 'Doc D',
      type: 'page',
      path: '/category/doc-d',
      content: null,
      isActive: false,
      pageId: 3,
    },
    {
      name: 'Doc E',
      type: 'page',
      path: '/category/doc-e',
      content: null,
      isActive: false,
      pageId: 4,
    },
  ])
})
