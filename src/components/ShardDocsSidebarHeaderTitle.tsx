import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./ShardDocsSidebarHeaderTitle.scss";

type HeaderTitleProps = {
  title: string,
  path: string
}

const HeaderTitle = (props: HeaderTitleProps) => {
  return (
    <NavLink to={props.path} className="shard-docs-header-title">
      <h2 title={props.title}>{props.title}</h2>
    </NavLink>
  );
};

HeaderTitle.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string
};

HeaderTitle.defaultProps = {
  title: "",
  path: "/"
};

export default HeaderTitle;
