import PropTypes from "prop-types";

export const DataPropType = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.element,PropTypes.array,PropTypes.bool])
  }),
);

export const BreadcrumbPropType = PropTypes.shape({
  name: PropTypes.string,
  path: PropTypes.string,
  isActive: PropTypes.bool.isRequired
});
export const BreadcrumbsPropType = PropTypes.arrayOf(BreadcrumbPropType);

export const LinkPropType = PropTypes.shape({
  type: PropTypes.oneOf(["link"]),
  name: PropTypes.string,
  url: PropTypes.string,
  external: PropTypes.bool
});

export const PagePropType = PropTypes.shape({
  type: PropTypes.oneOf(["page"]),
  path: PropTypes.string,
  name: PropTypes.string,
  isEmpty: PropTypes.bool,
  isActive: PropTypes.bool,
  breadcrumbs: BreadcrumbsPropType,
  content: PropTypes.element
});

export const CategoryPropShape = {
  type: PropTypes.oneOf(["category"]),
  path: PropTypes.string,
  name: PropTypes.string,
  isEmpty: PropTypes.bool,
  isActive: PropTypes.bool,
} as { [key: string]: any };
CategoryPropShape.items = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PagePropType,
    LinkPropType,
    PropTypes.shape(CategoryPropShape )
  ])
);

export const CategoryPropType = PropTypes.shape(CategoryPropShape);

export const ItemsPropType = PropTypes.arrayOf(PropTypes.oneOfType([PagePropType, LinkPropType, CategoryPropType]));
