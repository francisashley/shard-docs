import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { BreadcrumbPropType } from "../prop-types";
import "./ShardDocsMainBreadcrumbs.scss";

type props = {
  breadcrumbs: breadcrumb[],
}

const ShardDocsMainBreadcrumbs = ({ breadcrumbs }: props) => (
  <nav className="shard-docs-breadcrumbs">
    <ol>
      {breadcrumbs.map(({ name, path, isActive }, i) => {
        const className = classnames(isActive && "active");

        return (
          <li key={i}>
            {
              <NavLink isActive={() => isActive} to={path}>
                {name}
              </NavLink>
            }
          </li>
        );
      })}
    </ol>
  </nav>
);

ShardDocsMainBreadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbPropType).isRequired
};

ShardDocsMainBreadcrumbs.defaultProps = {
  breadcrumbs: []
};

export default ShardDocsMainBreadcrumbs;
