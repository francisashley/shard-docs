import slugify from "slugify";
import kebabCase from "lodash/kebabCase";
import React from "react";

const getSlug = (name: string) => slugify(kebabCase(name), { lower: true });
const removeDuplicateSlashes = (path: string) => path.replace(/\/+$/, "").replace(/\/+/g, "/");
const isInternalLink = (text: string) => new RegExp('^\/.+').test(text);
const isExternalLink = (text: string) => new RegExp('^https?:\/\/.+').test(text);

const getInputType = (item: inputItem): "category" | "page" | "link" | null => {
  if (!item.name) return null;
  else if (Array.isArray(item.content)) return "category";
  else if (typeof item.content === 'string' && (isInternalLink(item.content) || isExternalLink(item.content))) return 'link';
  else if (React.isValidElement(item.content) || item.content === null) return "page";
  return null;
}

function normaliseContent(items: inputData): data {
  const itemTemplates = {
    category: { type: 'category', name: '', path: '', items: [], isEmpty: true, isActive: false, depth: 0 },
    page: { type: 'page', name: '', path: '', breadcrumbs: [], content: null, isEmpty: true, isActive: false, depth: 0 },
    link: { type: 'link', name: '', url: '', external: false, depth: 0 },
  }

  const output = [];

  for (const item of items) {
    const inputType = getInputType(item);

    if (!inputType) continue;

    const outputTemplate = itemTemplates[inputType];

    if (inputType === "category") {
      const items = normaliseContent((item.content || []) as inputData);
      output.push({ ...outputTemplate, name: item.name, items } as category);
    } else if (inputType === "page") {
      output.push({ ...outputTemplate, name: item.name, content: item.content } as page);
    } else if (inputType === "link") {
      output.push({ ...outputTemplate, name: item.name, url: item.content, external: isExternalLink(item.content as string) } as link);
    }
  }

  return output;
}

 function addPaths(items: data, basePath = ''): data {
    const output = []
    for (const item of items) {
      const path = removeDuplicateSlashes(`${basePath}/${getSlug(item.name || '')}`);
      if (item.type === "category") {
        output.push({ ...item, path, items: addPaths(item.items || [], path) });
      } else if (item.type === "page") {
        output.push({ ...item, path });
      } else if (item.type === "link") {
        output.push(item);
      }
  }
  return output;
}

/**
 * Recursively loops through source tree adding breadcrumbs to all pages / categories.
 * @param  {array} items Expects result of parse / shapeItems().
 * @return {array}
 */
function addBreadcrumbs(items: data, breadcrumbs: breadcrumb[]): data {
  const output = [];
  for (const item of items) {
    if (item.type === "category") {
      output.push({
        ...item,
        items: addBreadcrumbs(item.items || [], [...breadcrumbs, { name: item.name || '', path: item.path, isActive: false }]),
      })
    } else if (item.type === "page") {
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
 * @param  {array} items Expects result of parse/combineTopLevelAdjacentPages().
 * @return {array}
 */
 function shapeItems(items: data): data {
  const output = [];
  for (const item of items) {
    if (item.type === "category") {
      const items = shapeItems(item.items || []);
      const isEmpty = !item.items?.length;
      output.push({ ...item, isEmpty, items })
    } else if (item.type === "page") {
      const isEmpty = !item.content;
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
 function combineTopLevelAdjacentItems(items: data): data {
  const preparedItems = items.map(item => {
    if (item.type !== "category") {
      return { name: null, items: [item], type: "category"} as category;
    }
    return item
  });

  const output = [];
  for (const item of preparedItems) {
    const lastItem = output[output.length - 1] as item | undefined;
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
 * @param  {array} items Expects result of parse/ shapeItems().
 * @return {array}
 */
function addDepth(items: data, depth = 0): data {
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
 * Loops through each item, child and grandchild grabbing each page.
 * @param  {array} source Expects source array to have been fed through addTypes..
 * @return {array} returns all pages in an array
 */
function getPages(items: data, accumulator: (page)[] = []) {
  for (const item of items) {
    if (item.type === "category") {
      accumulator = getPages((item.items || []), accumulator);
    } else if (item.type === "page") {
      accumulator = [...accumulator, item];
    }
  }
  return accumulator;
}

function getCurrentPage(pages: page[], path: string): page | null {
  return pages.find(page => page.path === path) || null;
}

function getPrevPage(pages: page[], currentPath: string): page | null {
  const activeIndex = pages.findIndex((document: page) => document.path === currentPath);
  return pages[activeIndex - 1] ? pages[activeIndex - 1] : null;
}

function getNextPage(pages: page[], currentPath: string): page | null {
  const activeIndex = pages.findIndex((document: page) => document.path === currentPath);
  return pages[activeIndex + 1] ? pages[activeIndex + 1] : null;
}

/**
 * Parse all user defined content and return a structured array.
 * @param items 
 * @param basePath 
 * @returns 
 */
function parse(items: inputData, basePath = "/") {
  let normalisedItems = normaliseContent(items);
  normalisedItems = addPaths(normalisedItems, basePath);
  normalisedItems = addBreadcrumbs(normalisedItems, [{ path: basePath, name: "~", isActive: false }]);
  normalisedItems = shapeItems(normalisedItems);
  normalisedItems = combineTopLevelAdjacentItems(normalisedItems);
  normalisedItems = addDepth(normalisedItems);

  return normalisedItems;
}

/**
 * Return pages that are equal too or descendants of path.
 * @param  {array} pages fed in from adapters/contentTool()
 * @param  {string} path current url
 * @return {array}
 */
function filterPages(pages: page[] = [], path = "") {
  return pages.filter(page => page.path.startsWith(path));
}

/**
 * Loop through breadcrumb in page and set isActive on crumbs that match provided path.
 * @param  {array} breadcrumbs a field from page object
 * @param  {string} path current url
 * @return {array}
 */
function setActiveCrumb(page: page, path = "") {
  page.breadcrumbs = page.breadcrumbs.map(crumb => ({
    ...crumb,
    isActive: crumb.path === path
  }));
  return page;
}

/**
 * Compare a path to each path in page / category items and set boolean result on isActive prop.
 * @param  {array} items fed in from adapters/contentTool()
 * @param  {string} currentPath current url
 * @return {array}
 */
function setActiveMenuItem(items: data = [], currentPath = "") {
  return items.map(item => {
    if (item.type === "category") {
      item.items = setActiveMenuItem(item.items, currentPath);
    }
    if (item.type === "category" || item.type === "page") {
      item.isActive = item.path === currentPath;
    }
    return item;
  });
}


export default {
  parse,
  getPages,
  getCurrentPage,
  getPrevPage,
  getNextPage,
  filterPages,
  setActiveCrumb,
  setActiveMenuItem
}