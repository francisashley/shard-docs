import React from "react";
import { NavLink } from "react-router-dom";
import { PagePropType } from "../prop-types";
import "./ShardDocsMainPagination.scss";

type PaginationButtonProps = {
  path: string,
  name: string,
  className: string
}

const PaginationButton = ({ path, name, ...props }: PaginationButtonProps) => (
  <div {...props}>
    <NavLink to={path} children={name} exact />
  </div>
);

type PaginationProps = {
  prevPage?: {
    name: string,
    path: string
  },
  nextPage?: {
    name: string,
    path: string
  },
}

const Pagination = (props: PaginationProps) => {
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
