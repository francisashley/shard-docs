import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./AppHeaderTitle.scss";

type props = {
  title: string,
  path: string
}

const AppHeaderTitle = (props: props) => {
  return (
    <NavLink to={props.path} className="sd-AppHeaderTitle">
      <h2 title={props.title} aria-label="Home">{props.title}</h2>
    </NavLink>
  );
};

AppHeaderTitle.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string
};

AppHeaderTitle.defaultProps = {
  title: "",
  path: "/"
};

export default AppHeaderTitle;
