import PropTypes from "prop-types";

// Content data
export const ContentDocumentPropType = PropTypes.shape({ type: PropTypes.oneOf(['document']).isRequired, name: PropTypes.string, document: PropTypes.element });
export const ContentCategoryPropType = PropTypes.shape({ type: PropTypes.oneOf(['category']).isRequired, name: PropTypes.string, items: PropTypes.array });
export const ContentExternalLinkPropType = PropTypes.shape({ type: PropTypes.oneOf(['external-link']).isRequired, name: PropTypes.string, externalLink: PropTypes.string });
export const ContentPropType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    ContentDocumentPropType,
    ContentCategoryPropType,
    ContentExternalLinkPropType,
  ])
);

// Breadcrumbs data
export const BreadcrumbPropType = PropTypes.shape({
  text: PropTypes.string,
  link: PropTypes.string,
  isActive: PropTypes.bool.isRequired
});
export const BreadcrumbsPropType = PropTypes.arrayOf(BreadcrumbPropType);

// Pagination data
export const PaginationPropType = PropTypes.shape({
  prev: PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string
  }),
  next: PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string
  })
});

// Tree structure leaves data
export const ExternalLinkPropType = PropTypes.shape({
  type: PropTypes.oneOf(["external-link"]),
  name: PropTypes.string,
  link: PropTypes.string
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
};
CategoryPropShape.items = PropTypes.arrayOf(
  PropTypes.oneOfType([
    DocumentPropType,
    ExternalLinkPropType,
    PropTypes.shape(CategoryPropShape)
  ])
);

export const CategoryPropType = PropTypes.shape(CategoryPropShape);

export const TreePropType = PropTypes.arrayOf(PropTypes.oneOfType([DocumentPropType, ExternalLinkPropType, CategoryPropType]));
