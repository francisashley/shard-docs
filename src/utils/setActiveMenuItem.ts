/**
 * Compare a path to each path in document / category items and set boolean result on isActive prop.
 * @param  {array} tree fed in from adapters/contentTool()
 * @param  {string} currentPath current url
 * @return {array}
 */

export default function setActiveMenuItem(tree: item[] = [], currentPath = "") {
  return tree.map(node => {
    if (node.type === "category") {
      node.items = setActiveMenuItem(node.items, currentPath);
    }
    if (node.type === "category" || node.type === "document") {
      node.isActive = node.path === currentPath;
    }
    return node;
  });
}