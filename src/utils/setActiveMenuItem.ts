/**
 * Compare a path to each path in document / category items and set boolean result on isActive prop.
 * @param  {array} items fed in from adapters/contentTool()
 * @param  {string} currentPath current url
 * @return {array}
 */

export default function setActiveMenuItem(items: item[] = [], currentPath = "") {
  return items.map(node => {
    if (node.type === "category") {
      node.items = setActiveMenuItem(node.items, currentPath);
    }
    if (node.type === "category" || node.type === "document") {
      node.isActive = node.path === currentPath;
    }
    return node;
  });
}
