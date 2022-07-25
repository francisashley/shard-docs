import slugify from "slugify";
import kebabCase from "lodash/kebabCase";

function parseContent(tree, basePath = "/") {
  tree = addPaths(tree, basePath);
  tree = addBreadcrumbs(tree, [{ path: basePath, name: "~", isActive: false }]);
  tree = shapeItems(tree, basePath);
  tree = combineTopLevelAdjacentItems(tree);
  tree = addDepth(tree);

  return {
    tree,
    documents: flattenDocuments(tree)
  };
}

/**
 * Combine all top level adjacent items (except categories) into discrete categories.
 * @param  {array} items Requires types to have been added to array with addTypes().
 * @return {array}
 */
function combineTopLevelAdjacentItems(items) {
  const isDiscreteCategory = item => item && item.type === "category" && !item.name;

  items = items.map(item => {
    return item.type !== "category"
      ? { name: null, items: [item], type: "category", depth: 0 }
      : item;
  });

  return items.reduce((accumulator, item) => {
    const lastItem = accumulator[accumulator.length - 1];

    if (isDiscreteCategory(item) && isDiscreteCategory(lastItem)) {
      lastItem.items = [...lastItem.items, ...item.items];
      accumulator[accumulator.length - 1] = lastItem;
    } else {
      accumulator = [...accumulator, item];
    }
    return accumulator;
  }, []);
}

/**
 * Loops through each item, child and grandchild detecting and calculating and
 * and each items path.
 * @param  {array} items Expects result of parseContent/combineTopLevelAdjacentDocuments().
 * @return {array}
 */
function addPaths(items, basePath) {
  const getSlug = name => slugify(kebabCase(name), { lower: true });

  return items.map(item => {
    // Generate path and remove trailing / duplicate slashes
    item.path = `${basePath}/${getSlug(item.name)}`.replace(/\/+$/, "").replace(/\/+/g, "/");

    if (item.type === "category") {
      item.items = addPaths(item.items, item.path);
    }

    return item;
  });
}

/**
 * Recursively loops through source tree adding breadcrumbs to all documents / categories.
 * @param  {array} items Expects result of parseContent/ shapeItems().
 * @return {array}
 */
function addBreadcrumbs(items, breadcrumbs) {
  return items.map(item => {
    const crumb = { name: item.name, path: item.path, isActive: false };
    if (item.type === "category") {
      item.items = addBreadcrumbs(item.items, [...breadcrumbs, crumb]);
    } else if (item.type === "document") {
      return { ...item, breadcrumbs: [...breadcrumbs, crumb] };
    }
    return item;
  });
}

/**
 * Recursively loops through source tree adding depth level to all items.
 * @param  {array} items Expects result of parseContent/ shapeItems().
 * @return {array}
 */
function addDepth(items, depth = 0) {
  return items.map(item => {
    if (item.type === "category") {
      item.items = addDepth(item.items, depth + 1);
    }
    item.depth = depth;
    return item;
  });
}

/**
 * Loops through each item, child and grandchild shaping each item to the specs of its given type.
 * @param  {array} items Expects result of parseContent/combineTopLevelAdjacentDocuments().
 * @return {array}
 */
function shapeItems(items) {
  return items
    .map(item => {
      const { type, name, path, url, depth, external = false } = item;
      if (type === "link") {
        return { type, name, url, depth, external };
      } else if (type === "category" && name) {
        const isEmpty = !item.items.length;
        const isActive = false;
        const items = shapeItems(item.items);
        return { type, path, name, isEmpty, isActive, items, depth };
      } else if (type === "document") {
        const isEmpty = !Boolean(item.document);
        const isActive = false;
        const document = item.document;
        const breadcrumbs = item.breadcrumbs;
        return { type, path, name, isEmpty, isActive, breadcrumbs, document, depth };
      }
      return null;
    })
    .filter(Boolean);
}

/**
 * Loops through each item, child and grandchild grabbing each document.
 * @param  {array} source Expects source array to have been fed through addTypes..
 * @return {array} returns all documents in an array
 */
function flattenDocuments(items, accumulator = []) {
  for (const item of items) {
    if (item.type === "category") {
      accumulator = flattenDocuments(item.items, accumulator);
    } else if (item.type === "document") {
      accumulator = [...accumulator, item];
    }
  }
  return accumulator;
}

export default {
  parseContent
}