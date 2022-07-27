import React from "react";
import { NavLink } from "react-router-dom";
import { PagePropType } from "../prop-types";
import "./MainPagination.scss";

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

type MainPaginationProps = {
  prevPage?: paginationPage,
  nextPage?: paginationPage,
}

const MainPagination = (props: MainPaginationProps) => {
  return (
    <footer className="sd-MainPagination">
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

MainPagination.propTypes = {
  prevPage: PagePropType,
  nextPage: PagePropType
};

MainPagination.defaultProps = {
  prevPage: null,
  nextPage: null,
};

export default MainPagination;
