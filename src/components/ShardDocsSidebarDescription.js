import React from "react";
import PropTypes from "prop-types";
import "./ShardDocsSidebarDescription.scss";

/**
 * Description
 */

const Description = ({ description }) => <p className="shard-docs-description">{description}</p>;

Description.propTypes = {
  description: PropTypes.string
};
Description.defaultProps = {
  description: ""
};

export default Description;
