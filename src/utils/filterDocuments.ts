/**
 * Return documents that are equal too or descendants of path.
 * @param  {array} documents fed in from adapters/contentTool()
 * @param  {string} path current url
 * @return {array}
 */

export default function filterDocuments(documents: contentItemDocument[] = [], path = "") {
  return documents.filter(document => document.path.startsWith(path));
}
