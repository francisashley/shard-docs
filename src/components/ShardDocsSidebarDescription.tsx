import React from "react";
import PropTypes from "prop-types";
import "./ShardDocsSidebarDescription.scss";

type props = {
  description: string
}

const ShardDocsSidebarDescription = (props: props) => <p className="shard-docs-description">{props.description}</p>;

ShardDocsSidebarDescription.propTypes = {
  description: PropTypes.string
};
ShardDocsSidebarDescription.defaultProps = {
  description: ""
};

export default ShardDocsSidebarDescription;
