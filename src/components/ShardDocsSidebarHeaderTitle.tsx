import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./ShardDocsSidebarHeaderTitle.scss";

type props = {
  title: string,
  path: string
}

const ShardDocsSidebarHeaderTitle = (props: props) => {
  return (
    <NavLink to={props.path} className="shard-docs-header-title">
      <h2 title={props.title}>{props.title}</h2>
    </NavLink>
  );
};

ShardDocsSidebarHeaderTitle.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string
};

ShardDocsSidebarHeaderTitle.defaultProps = {
  title: "",
  path: "/"
};

export default ShardDocsSidebarHeaderTitle;
