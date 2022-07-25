import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { PagePropType } from "../prop-types";
import "./ShardDocsMainPagination.scss";

/**
 * Pagination
 */

const PaginationButton = ({ path, name, ...props }) => (
  <div {...props}>
    <NavLink to={path} children={name} exact />
  </div>
);

const Pagination = props => {
  const showPagination = Boolean(props.prevPage || props.nextPage);

  return (
    showPagination && (
      <footer className="shard-docs-pagination">
        {props.prevPage && (
          <PaginationButton
            className="prev"
            name={`⟵ ${props.prevPage.name}`}
            path={props.prevPage.path}
          ></PaginationButton>
        )}
        {props.nextPage && (
          <PaginationButton
            className="next"
            name={`${props.nextPage.name} ⟶`}
            path={props.nextPage.path}
          ></PaginationButton>
        )}
      </footer>
    )
  );
};

Pagination.propTypes = {
  prevPage: PagePropType,
  nextPage: PagePropType
};

Pagination.defaultProps = {
  prevPage: null,
  nextPage: null,
};

export default Pagination;
