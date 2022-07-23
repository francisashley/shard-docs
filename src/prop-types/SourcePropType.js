import PropTypes from "prop-types";

export default PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.shape({ type: PropTypes.oneOf(['document']).isRequired, title: PropTypes.string, document: PropTypes.array }),
    PropTypes.shape({ type: PropTypes.oneOf(['folder']).isRequired, title: PropTypes.string, folder: PropTypes.array }),
    PropTypes.shape({ type: PropTypes.oneOf(['external-link']).isRequired, title: PropTypes.string, externalLink: PropTypes.string })
  ])
);
