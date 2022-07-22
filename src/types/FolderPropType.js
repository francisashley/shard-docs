import PropTypes from "prop-types";
import TreePropType from "./TreePropType";

export default PropTypes.shape({
  type: PropTypes.oneOf(["folder"]),
  path: PropTypes.string,
  title: PropTypes.string,
  isEmpty: PropTypes.bool,
  isActive: PropTypes.bool,
  folder: TreePropType
});
