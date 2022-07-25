import React from "react";
import PropTypes from "prop-types";
import Pagination from "./ShardDocsMainPagination";
import Document from "./ShardDocsMainDocument";
import { PagePropType, DocumentPropType } from "../prop-types";
import "./ShardDocsMain.scss";

/**
 * Main
 */

const Main = props => {
  return (
    <main className="shard-docs-main">
      {props.documents.map((document, i) => (
        <Document key={i} breadcrumbs={document.breadcrumbs} document={document.document} />
      ))}
      <Pagination prevPage={props.prevPage} nextPage={props.nextPage} />
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
