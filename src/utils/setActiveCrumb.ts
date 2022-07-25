/**
 * Loop through breadcrumb in document and set isActive on crumbs that match provided path.
 * @param  {array} breadcrumbs a field from document object
 * @param  {string} path current url
 * @return {array}
 */

import { contentItemDocument } from "./contentTool";

export default function setIsActive(document: contentItemDocument, path = "") {
  document.breadcrumbs = document.breadcrumbs.map(crumb => ({
    ...crumb,
    isActive: crumb.path === path
  }));
  return document;
}
