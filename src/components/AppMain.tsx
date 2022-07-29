import React from "react";
import PropTypes from "prop-types";
import MainPagination from "./MainPagination";
import MainContent from "./MainContent";
import { PagePropType, PageItemPropType } from "../prop-types";
import "./AppMain.scss";

type props = {
  page?: pageItem | null,
  prevPage?: paginationPage,
  nextPage?: paginationPage,
}

const AppMain = (props: props) => {
  const showPagination = Boolean(props.prevPage || props.nextPage);

  const Content = props.page && <MainContent breadcrumbs={props.page.breadcrumbs} content={props.page.content} />
  const Pagination = showPagination && <MainPagination prevPage={props.prevPage} nextPage={props.nextPage} />

  return (
    <main className="sd-AppMain">
      {Content}
      {Pagination}
    </main>
  );
};

AppMain.propTypes = {
  prevPage: PagePropType,
  nextPage: PagePropType,
  page: PropTypes.arrayOf(PageItemPropType)
};
AppMain.defaultProps = {
  prevPage: null,
  nextPage: null,
  page: null
};

export default AppMain;
