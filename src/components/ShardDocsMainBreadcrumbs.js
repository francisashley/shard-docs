import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { BreadcrumbPropType } from "../prop-types";
import "./ShardDocsMainBreadcrumbs.scss";

/**
 * Breadcrumbs
 */

const Breadcrumbs = ({ breadcrumbs }) => (
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

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbPropType).isRequired
};

Breadcrumbs.defaultProps = {
  breadcrumbs: []
};

export default Breadcrumbs;
