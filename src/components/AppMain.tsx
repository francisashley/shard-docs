import React from "react";
import PropTypes from "prop-types";
import MainPagination from "./MainPagination";
import MainDocument from "./MainDocument";
import { PagePropType, DocumentItemPropType } from "../prop-types";
import "./AppMain.scss";

type props = {
  document?: documentItem | null,
  prevPage?: paginationPage,
  nextPage?: paginationPage,
}

const AppMain = (props: props) => {
  const showPagination = Boolean(props.prevPage || props.nextPage);

  const Document = props.document && <MainDocument breadcrumbs={props.document.breadcrumbs} document={props.document.document} />
  const Pagination = showPagination && <MainPagination prevPage={props.prevPage} nextPage={props.nextPage} />

  return (
    <main className="sd-AppMain">
      {Document}
      {Pagination}
    </main>
  );
};

AppMain.propTypes = {
  prevPage: PagePropType,
  nextPage: PagePropType,
  document: PropTypes.arrayOf(DocumentItemPropType)
};
AppMain.defaultProps = {
  prevPage: null,
  nextPage: null,
  document: null
};

export default AppMain;
