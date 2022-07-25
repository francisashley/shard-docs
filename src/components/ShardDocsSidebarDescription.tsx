import React from "react";
import PropTypes from "prop-types";
import "./ShardDocsSidebarDescription.scss";

type DescriptionProps = {
  description: string
}

const Description = (props: DescriptionProps) => <p className="shard-docs-description">{props.description}</p>;

Description.propTypes = {
  description: PropTypes.string
};
Description.defaultProps = {
  description: ""
};

export default Description;
