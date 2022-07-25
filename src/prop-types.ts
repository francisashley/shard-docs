import PropTypes from "prop-types";

// Content data
export const ContentDocumentPropType = PropTypes.shape({
  type: PropTypes.oneOf(['document']).isRequired,
  name: PropTypes.string,
  document: PropTypes.element
});
export const ContentCategoryPropType = PropTypes.shape({
  type: PropTypes.oneOf(['category']).isRequired,
  name: PropTypes.string,
  items: PropTypes.array
});
export const ContentLinkPropType = PropTypes.shape({
  type: PropTypes.oneOf(['link']).isRequired,
  name: PropTypes.string,
  url: PropTypes.string,
  external: PropTypes.bool
});
export const ContentPropType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    ContentDocumentPropType,
    ContentCategoryPropType,
    ContentLinkPropType,
  ])
);

// Breadcrumbs data
export const BreadcrumbPropType = PropTypes.shape({
  name: PropTypes.string,
  path: PropTypes.string,
  isActive: PropTypes.bool.isRequired
});
export const BreadcrumbsPropType = PropTypes.arrayOf(BreadcrumbPropType);

// Pagination data
export const PagePropType = PropTypes.shape({
  name: PropTypes.string,
  path: PropTypes.string
});

// Tree structure leaves data
export const LinkPropType = PropTypes.shape({
  type: PropTypes.oneOf(["link"]),
  name: PropTypes.string,
  url: PropTypes.string,
  external: PropTypes.bool
});

export const DocumentPropType = PropTypes.shape({
  type: PropTypes.oneOf(["document"]),
  path: PropTypes.string,
  name: PropTypes.string,
  isEmpty: PropTypes.bool,
  isActive: PropTypes.bool,
  breadcrumbs: BreadcrumbsPropType,
  document: PropTypes.element
});

// Tree structure (problematic) data
export const CategoryPropShape = {
  type: PropTypes.oneOf(["category"]),
  path: PropTypes.string,
  name: PropTypes.string,
  isEmpty: PropTypes.bool,
  isActive: PropTypes.bool,
} as { [key: string]: any };
CategoryPropShape.items = PropTypes.arrayOf(
  PropTypes.oneOfType([
    DocumentPropType,
    LinkPropType,
    PropTypes.shape(CategoryPropShape )
  ])
);

export const CategoryPropType = PropTypes.shape(CategoryPropShape);

export const TreePropType = PropTypes.arrayOf(PropTypes.oneOfType([DocumentPropType, LinkPropType, CategoryPropType]));
