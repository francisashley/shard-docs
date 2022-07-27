import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { BreadcrumbPropType } from "../prop-types";
import "./MainBreadcrumbs.scss";

type props = {
  breadcrumbs: breadcrumb[],
}

const MainBreadcrumbs = ({ breadcrumbs }: props) => (
  <nav className="sd-MainBreadcrumbs">
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

MainBreadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbPropType).isRequired
};

MainBreadcrumbs.defaultProps = {
  breadcrumbs: []
};

export default MainBreadcrumbs;
