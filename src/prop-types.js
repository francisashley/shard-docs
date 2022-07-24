import PropTypes from "prop-types";

// Source data
export const SourceDocumentPropType = PropTypes.shape({ type: PropTypes.oneOf(['document']).isRequired, title: PropTypes.string, document: PropTypes.element });
export const SourceFolderPropType = PropTypes.shape({ type: PropTypes.oneOf(['folder']).isRequired, title: PropTypes.string, folder: PropTypes.array });
export const SourceExternalLinkPropType = PropTypes.shape({ type: PropTypes.oneOf(['external-link']).isRequired, title: PropTypes.string, externalLink: PropTypes.string });
export const SourcePropType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    SourceDocumentPropType,
    SourceFolderPropType,
    SourceExternalLinkPropType,
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
  type: PropTypes.oneOf(["external"]),
  title: PropTypes.string,
  link: PropTypes.string
});

export const DocumentPropType = PropTypes.shape({
  type: PropTypes.oneOf(["document"]),
  path: PropTypes.string,
  title: PropTypes.string,
  isEmpty: PropTypes.bool,
  isActive: PropTypes.bool,
  breadcrumbs: BreadcrumbsPropType,
  document: PropTypes.element
});

// Tree structure (problematic) data
export const FolderPropShape = {
  type: PropTypes.oneOf(["folder"]),
  path: PropTypes.string,
  title: PropTypes.string,
  isEmpty: PropTypes.bool,
  isActive: PropTypes.bool,
};
FolderPropShape.folder = PropTypes.arrayOf(
  PropTypes.oneOfType([
    DocumentPropType,
    ExternalLinkPropType,
    PropTypes.shape(FolderPropShape)
  ])
);

export const FolderPropType = PropTypes.shape(FolderPropShape);

export const TreePropType = PropTypes.arrayOf(PropTypes.oneOfType([DocumentPropType, ExternalLinkPropType, FolderPropType]));
