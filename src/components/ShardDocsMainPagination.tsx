import React from "react";
import { NavLink } from "react-router-dom";
import { PagePropType } from "../prop-types";
import "./ShardDocsMainPagination.scss";

type paginationButtonProps = {
  path: string,
  name: string,
  className: string
}

const PaginationButton = ({ path, name, ...props }: paginationButtonProps) => (
  <div {...props}>
    <NavLink to={path} children={name} exact />
  </div>
);

type ShardDocsMainPaginationProps = {
  prevPage?: paginationPage,
  nextPage?: paginationPage,
}

const ShardDocsMainPagination = (props: ShardDocsMainPaginationProps) => {
  return (
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
  );
};

ShardDocsMainPagination.propTypes = {
  prevPage: PagePropType,
  nextPage: PagePropType
};

ShardDocsMainPagination.defaultProps = {
  prevPage: null,
  nextPage: null,
};

export default ShardDocsMainPagination;
