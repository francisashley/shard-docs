import PropTypes from "prop-types";
import DocumentPropType from "./DocumentPropType";
import ExternalPropType from "./ExternalLinkPropType";
import FolderPropType from "./FolderPropType";

export default PropTypes.arrayOf(PropTypes.oneOfType([DocumentPropType, ExternalPropType, FolderPropType]));
