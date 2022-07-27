import React from "react";
import PropTypes from "prop-types";
import MainPagination from "./MainPagination";
import MainDocument from "./MainDocument";
import { PagePropType, DocumentItemPropType } from "../prop-types";
import "./AppMain.scss";

type props = {
  documents: documentItem[],
  prevPage?: paginationPage,
  nextPage?: paginationPage,
}

const AppMain = (props: props) => {
  const showPagination = Boolean(props.prevPage || props.nextPage);

  const Documents = props.documents.map((document, i) => (
    <MainDocument key={i} breadcrumbs={document.breadcrumbs} document={document.document} />
  ))

  const Pagination = showPagination && <MainPagination prevPage={props.prevPage} nextPage={props.nextPage} />

  return (
    <main className="sd-AppMain">
      {Documents}
      {Pagination}
    </main>
  );
};

AppMain.propTypes = {
  prevPage: PagePropType,
  nextPage: PagePropType,
  documents: PropTypes.arrayOf(DocumentItemPropType)
};
AppMain.defaultProps = {
  prevPage: null,
  nextPage: null,
  documents: []
};

export default AppMain;
