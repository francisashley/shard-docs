import PropTypes from "prop-types";

export const ContentPropType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf(['document']).isRequired,
      name: PropTypes.string,
      document: PropTypes.element
    }),
    PropTypes.shape({
      type: PropTypes.oneOf(['category']).isRequired,
      name: PropTypes.string,
      items: PropTypes.array
    }),
    PropTypes.shape({
      type: PropTypes.oneOf(['link']).isRequired,
      name: PropTypes.string,
      url: PropTypes.string,
      external: PropTypes.bool
    }),
  ])
);

export const BreadcrumbPropType = PropTypes.shape({
  name: PropTypes.string,
  path: PropTypes.string,
  isActive: PropTypes.bool.isRequired
});
export const BreadcrumbsPropType = PropTypes.arrayOf(BreadcrumbPropType);

export const PagePropType = PropTypes.shape({
  name: PropTypes.string,
  path: PropTypes.string
});

export const LinkItemPropType = PropTypes.shape({
  type: PropTypes.oneOf(["link"]),
  name: PropTypes.string,
  url: PropTypes.string,
  external: PropTypes.bool
});

export const DocumentItemPropType = PropTypes.shape({
  type: PropTypes.oneOf(["document"]),
  path: PropTypes.string,
  name: PropTypes.string,
  isEmpty: PropTypes.bool,
  isActive: PropTypes.bool,
  breadcrumbs: BreadcrumbsPropType,
  document: PropTypes.element
});

export const CategoryItemPropShape = {
  type: PropTypes.oneOf(["category"]),
  path: PropTypes.string,
  name: PropTypes.string,
  isEmpty: PropTypes.bool,
  isActive: PropTypes.bool,
} as { [key: string]: any };
CategoryItemPropShape.items = PropTypes.arrayOf(
  PropTypes.oneOfType([
    DocumentItemPropType,
    LinkItemPropType,
    PropTypes.shape(CategoryItemPropShape )
  ])
);

export const CategoryItemPropType = PropTypes.shape(CategoryItemPropShape);

export const TreePropType = PropTypes.arrayOf(PropTypes.oneOfType([DocumentItemPropType, LinkItemPropType, CategoryItemPropType]));
