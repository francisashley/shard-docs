import React from "react";
import PropTypes from "prop-types";
import Pagination from "./ShardDocsMainPagination";
import Document from "./ShardDocsMainDocument";
import { PagePropType, DocumentPropType } from "../prop-types";
import "./ShardDocsMain.scss";

type MainProps = {
  documents: documentItem[],
  prevPage?: paginationPage,
  nextPage?: paginationPage,
}
const Main = (props: MainProps) => {
  const showPagination = Boolean(props.prevPage || props.nextPage);
  return (
    <main className="shard-docs-main">
      {props.documents.map((document, i) => (
        <Document key={i} breadcrumbs={document.breadcrumbs} document={document.document} />
      ))}
     { showPagination && <Pagination prevPage={props.prevPage} nextPage={props.nextPage} />}
    </main>
  );
};

Main.propTypes = {
  prevPage: PagePropType,
  nextPage: PagePropType,
  documents: PropTypes.arrayOf(DocumentPropType)
};
Main.defaultProps = {
  prevPage: null,
  nextPage: null,
  documents: []
};

export default Main;
