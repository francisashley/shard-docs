import PropTypes from "prop-types";
import documentPropType from "./DocumentPropType";
import breadcrumbPropType from "./BreadcrumbPropType";

export default PropTypes.shape({
  type: PropTypes.oneOf(["document"]),
  path: PropTypes.string,
  title: PropTypes.string,
  isEmpty: PropTypes.bool,
  isActive: PropTypes.bool,
  breadcrumbs: PropTypes.arrayOf(breadcrumbPropType),
  document: documentPropType
});
