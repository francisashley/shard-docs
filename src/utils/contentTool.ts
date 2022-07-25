import slugify from "slugify";
import kebabCase from "lodash/kebabCase";

interface baseContentItem {
  type: 'category' | 'document' | 'link';
  name: string;
  url?: string;
  external?: boolean;
  items?: baseContentItem[]
  document?: unknown;
}

interface contentItemWithPath extends baseContentItem {
  name: string;
  path?: string;
  items?: contentItemWithPath[]
}

interface contentItemWithBreadcrumbs extends contentItemWithPath {
  breadcrumbs?: breadcrumb[]
}

interface contentItemWithShape extends contentItemWithBreadcrumbs {
  isEmpty?: boolean;
  isActive?: boolean;
  depth: number;
}

interface contentItemWithCombinedItems {
  type: 'category' | 'document' | 'link';
  name: string | null;
  path: string;
  items?: contentItemWithCombinedItems[]
}

interface contentItemWithDepth {
  depth: number
  items?: contentItemWithDepth[]
  type: 'category' | 'document' | 'link';
  name: string | null;
  path: string;
}

type breadcrumb = {
  path: string,
  name: string,
  isActive: boolean
}

/**
 * Loops through each item, child and grandchild detecting and calculating and
 * and each items path.
 * @param  {array} items Expects result of parseContent/combineTopLevelAdjacentDocuments().
 * @return {array}
 */
function addPaths(items: baseContentItem[], basePath = ''): contentItemWithPath[] {
  const getSlug = (name: string) => slugify(kebabCase(name), { lower: true });

  return items.map(item => {
    // Generate path and remove trailing / duplicate slashes
    const path = `${basePath}/${getSlug(item.name)}`.replace(/\/+$/, "").replace(/\/+/g, "/");

    const outputItem = {
      type: item.type,
      name: item.name,
    }

    if (item.type === "category") {
      return { ...outputItem, path, items: addPaths(item.items || [], path) }
    } else if (item.type === "document") {
      return {
        ...outputItem,
        path,
        document: item.document,
      }
    } else if (item.type === "link") {
      return {
        ...outputItem,
        external: item.external,
        url: item.url,
      }
    } else {
      return outputItem
    }
  });
}

/**
 * Recursively loops through source tree adding breadcrumbs to all documents / categories.
 * @param  {array} items Expects result of parseContent/ shapeItems().
 * @return {array}
 */
function addBreadcrumbs(items: contentItemWithPath[], breadcrumbs: breadcrumb[]): contentItemWithBreadcrumbs[] {
  return items.map(item => {
    const crumb = {
      name: item.name,
      path: item.path || '',
      isActive: false
    };
    if (item.type === "category") {
      item.items = addBreadcrumbs(item.items || [], [...breadcrumbs, crumb]);
    } else if (item.type === "document") {
      return { ...item, breadcrumbs: [...breadcrumbs, crumb] };
    }
    return item;
  });
}

/**
 * Loops through each item, child and grandchild shaping each item to the specs of its given type.
 * @param  {array} items Expects result of parseContent/combineTopLevelAdjacentDocuments().
 * @return {array}
 */
 function shapeItems(items: contentItemWithBreadcrumbs[]): contentItemWithShape[] {
  return items
    .map(item => {
      const { type, name, path, url = '', external = false } = item;
      if (type === "link") {
        return { ...item, type, name, url, depth: 0, external };
      } else if (type === "category" && name) {
        const isEmpty = !item.items?.length;
        const isActive = false;
        const items = shapeItems(item.items || []);
        return { type, path, name, isEmpty, isActive, items, depth: 0 };
      } else if (type === "document") {
        const isEmpty = !Boolean(item.document);
        const isActive = false;
        const document = item.document;
        const breadcrumbs = item.breadcrumbs || [];
        return { type, path, name, isEmpty, isActive, breadcrumbs, document, depth: 0 };
      }
      return null;
    })
    .filter(item => item !== null) as contentItemWithShape[];
}

/**
 * Combine all top level adjacent items (except categories) into discrete categories.
 * @param  {array} items Requires types to have been added to array with addTypes().
 * @return {array}
 */
 function combineTopLevelAdjacentItems(items: contentItemWithShape[]): contentItemWithCombinedItems[] {
  const isDiscreteCategory = (item: contentItemWithCombinedItems): boolean => item && item.type === "category" && !item.name;

  const preparedItems = items.map(item => {
    if (item.type !== "category") {
      return { name: null, items: [item], type: "category"}
    }
    return item
  }) as contentItemWithCombinedItems[];

  return preparedItems.reduce((accumulator: contentItemWithCombinedItems[], item) => {
    const lastItem = accumulator[accumulator.length - 1];

    if (isDiscreteCategory(item) && isDiscreteCategory(lastItem)) {
      lastItem.items = [...(lastItem.items || []), ...(item.items || [])];
      accumulator[accumulator.length - 1] = lastItem;
    } else {
      accumulator = [...accumulator, item];
    }
    return accumulator;
  }, []);
}

/**
 * Recursively loops through source tree adding depth level to all items.
 * @param  {array} items Expects result of parseContent/ shapeItems().
 * @return {array}
 */
function addDepth(items: contentItemWithCombinedItems[], depth = 0): contentItemWithDepth[] {
  return items.map(item => {
    if (item.type === "category") {
      return {
        ...item,
        items: addDepth(item.items || [], depth + 1),
        depth
      }
    }
    return { ...item, depth }
  }) as contentItemWithDepth[]
}


/**
 * Loops through each item, child and grandchild grabbing each document.
 * @param  {array} source Expects source array to have been fed through addTypes..
 * @return {array} returns all documents in an array
 */
function flattenDocuments(items: contentItemWithDepth[], accumulator: contentItemWithDepth[] = []) {
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
  const treeWithPaths = addPaths(tree, basePath);
  const treeWithBreadcrumbs = addBreadcrumbs(treeWithPaths, [{ path: basePath, name: "~", isActive: false }]);
  const treeWithShapedItems = shapeItems(treeWithBreadcrumbs);
  const treeWithCombinedItems = combineTopLevelAdjacentItems(treeWithShapedItems);
  const processedItems = addDepth(treeWithCombinedItems);

  return {
    tree: processedItems,
    documents: flattenDocuments(processedItems)
  };
}

export default {
  parseContent
}