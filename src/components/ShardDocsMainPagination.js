import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { PaginationPropType } from "../prop-types";
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
  const { prev, next } = props.pagination;
  const show = Boolean(prev || next);

  return (
    show && (
      <footer className="shard-docs-pagination">
        {prev && (
          <PaginationButton
            className="prev"
            name={`⟵ ${prev.name}`}
            path={prev.path}
          ></PaginationButton>
        )}
        {next && (
          <PaginationButton
            className="next"
            name={`${next.name} ⟶`}
            path={next.path}
          ></PaginationButton>
        )}
      </footer>
    )
  );
};

Pagination.propTypes = {
  pagination: PaginationPropType
};

Pagination.defaultProps = {
  pagination: { prev: null, next: null }
};

export default Pagination;
