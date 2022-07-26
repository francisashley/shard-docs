/**
 * Compare a path to each path in document / category items and set boolean result on isActive prop.
 * @param  {array} items fed in from adapters/contentTool()
 * @param  {string} currentPath current url
 * @return {array}
 */

export default function setActiveMenuItem(items: item[] = [], currentPath = "") {
  return items.map(item => {
    if (item.type === "category") {
      item.items = setActiveMenuItem(item.items, currentPath);
    }
    if (item.type === "category" || item.type === "document") {
      item.isActive = item.path === currentPath;
    }
    return item;
  });
}
