import slugify from "slugify";
import kebabCase from "lodash/kebabCase";

export interface baseContentItem {
  type: 'category' | 'document' | 'link';
  name: string;
  url?: string;
  external?: boolean;
  items?: baseContentItem[]
  document?: unknown;
}

export type breadcrumb = {
  path: string,
  name: string,
  isActive: boolean
}

export type contentItemCategory = {
  type: 'category';
  name: string | null;
  path: string;
  items: (contentItemCategory | contentItemDocument | contentItemLink)[];
  isEmpty: boolean,
  isActive: boolean,
  depth: number
}

export type contentItemDocument = {
  type: 'document';
  name: string;
  path: string;
  document: string | React.ReactNode;
  breadcrumbs: breadcrumb[];
  isEmpty: boolean,
  isActive: boolean,
  depth: number
}

export type contentItemLink = {
  type: 'link';
  name: string;
  url: string;
  external: boolean;
  depth: number
}

const getSlug = (name: string) => slugify(kebabCase(name), { lower: true });
const removeDuplicateSlashes = (path: string) => path.replace(/\/+$/, "").replace(/\/+/g, "/");

function normaliseContent(items: baseContentItem[]): (contentItemCategory | contentItemDocument | contentItemLink)[] {
  const itemTemplates = {
    category: { type: 'category', name: '', path: '', items: [], isEmpty: true, isActive: false, depth: 0 },
    document: { type: 'document', name: '', path: '', breadcrumbs: [], document: null, isEmpty: true, isActive: false, depth: 0 },
    link: { type: 'link', name: '', url: '', external: false, depth: 0 },
  }

  const output = [];

  for (const item of items) {
    if (!itemTemplates[item.type]) continue;

    const outputTemplate = itemTemplates[item.type];

    if (item.type === "category") {
      const items = normaliseContent(item.items || []);
      output.push({ ...outputTemplate, name: item.name, items } as contentItemCategory);
    } else if (item.type === "document") {
      output.push({ ...outputTemplate, name: item.name, document: item.document } as contentItemDocument);
    } else if (item.type === "link") {
      output.push({ ...outputTemplate, name: item.name, url: item.url, external: item.external } as contentItemLink);
    }
  }

  return output;
}

 function addPaths(items: (contentItemCategory | contentItemDocument | contentItemLink)[], basePath = ''): (contentItemCategory | contentItemDocument | contentItemLink)[] {
    const output = []
    for (const item of items) {
      const path = removeDuplicateSlashes(`${basePath}/${getSlug(item.name || '')}`);
      if (item.type === "category") {
        output.push({ ...item, path, items: addPaths(item.items || [], path) });
      } else if (item.type === "document") {
        output.push({ ...item, path });
      } else if (item.type === "link") {
        output.push(item);
      }
  }
  return output;
}

/**
 * Recursively loops through source tree adding breadcrumbs to all documents / categories.
 * @param  {array} items Expects result of parseContent/ shapeItems().
 * @return {array}
 */
function addBreadcrumbs(items: (contentItemCategory | contentItemDocument | contentItemLink)[], breadcrumbs: breadcrumb[]): (contentItemCategory | contentItemDocument | contentItemLink)[] {
  const output = [];
  for (const item of items) {
    if (item.type === "category") {
      output.push({
        ...item,
        items: addBreadcrumbs(item.items || [], [...breadcrumbs, { name: item.name || '', path: item.path, isActive: false }]),
      })
    } else if (item.type === "document") {
      output.push({
        ...item,
        breadcrumbs: [...breadcrumbs, { name: item.name, path: item.path, isActive: false }],
      })
    } else if (item.type === "link") {
      output.push(item);
    }
  }
  return output;
}

/**
 * Loops through each item, child and grandchild shaping each item to the specs of its given type.
 * @param  {array} items Expects result of parseContent/combineTopLevelAdjacentDocuments().
 * @return {array}
 */
 function shapeItems(items: (contentItemCategory | contentItemDocument | contentItemLink)[]): (contentItemCategory | contentItemDocument | contentItemLink)[] {
  const output = [];
  for (const item of items) {
    if (item.type === "category") {
      const items = shapeItems(item.items || []);
      const isEmpty = !item.items?.length;
      output.push({ ...item, isEmpty, items })
    } else if (item.type === "document") {
      const isEmpty = !item.document;
      const depth = item.breadcrumbs?.length || 0;
      output.push({ ...item, isEmpty, depth })
    } else if (item.type === "link") {
      output.push(item)
    }
  }

  return output;
}

/**
 * Combine all top level adjacent items (except categories) into discrete categories.
 * @param  {array} items Requires types to have been added to array with addTypes().
 * @return {array}
 */
 function combineTopLevelAdjacentItems(items: (contentItemCategory | contentItemDocument | contentItemLink)[]): (contentItemCategory | contentItemDocument | contentItemLink)[] {
  const preparedItems = items.map(item => {
    if (item.type !== "category") {
      return { name: null, items: [item], type: "category"} as contentItemCategory;
    }
    return item
  });

  const output = [];
  for (const item of preparedItems) {
    const lastItem = output[output.length - 1] as contentItemCategory | contentItemDocument | contentItemLink | undefined;
    if (lastItem?.type === 'category' && !lastItem.name && item.type === 'category' && !item.name) {
      lastItem.items = [...lastItem.items, ...item.items];
      output[output.length - 1] = lastItem;
    } else {
      output.push(item);
    }
  }

  return output;
}

/**
 * Recursively loops through source tree adding depth level to all items.
 * @param  {array} items Expects result of parseContent/ shapeItems().
 * @return {array}
 */
function addDepth(items: (contentItemCategory | contentItemDocument | contentItemLink)[], depth = 0): (contentItemCategory | contentItemDocument | contentItemLink)[] {
  const output = [];
  for (const item of items) {
    if (item.type === "category") {
      const items = addDepth(item.items || [], depth + 1);
      output.push({ ...item, items, depth })
    } else {
      output.push({ ...item, depth })
    }
  }
  return output;
}


/**
 * Loops through each item, child and grandchild grabbing each document.
 * @param  {array} source Expects source array to have been fed through addTypes..
 * @return {array} returns all documents in an array
 */
function flattenDocuments(items: (contentItemCategory | contentItemDocument | contentItemLink)[], accumulator: (contentItemDocument)[] = []) {
  for (const item of items) {
    if (item.type === "category") {
      accumulator = flattenDocuments((item.items || []), accumulator);
    } else if (item.type === "document") {
      accumulator = [...accumulator, item];
    }
  }
  return accumulator;
}

function parseContent(tree: baseContentItem[], basePath = "/") {
  let normalisedTree = normaliseContent(tree);
  normalisedTree = addPaths(normalisedTree, basePath);
  normalisedTree = addBreadcrumbs(normalisedTree, [{ path: basePath, name: "~", isActive: false }]);
  normalisedTree = shapeItems(normalisedTree);
  normalisedTree = combineTopLevelAdjacentItems(normalisedTree);
  normalisedTree = addDepth(normalisedTree);

  return {
    tree: normalisedTree,
    documents: flattenDocuments(normalisedTree)
  };
}

export default {
  parseContent
}