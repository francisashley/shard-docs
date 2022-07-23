import React from "react";
import PropTypes from "prop-types";
import Pagination from "./ShardDocsMainPagination";
import Document from "./ShardDocsMainDocument";
import { PaginationPropType, DocumentPropType } from "../prop-types";
import "./ShardDocsMain.scss";

/**
 * Main
 */

const Main = ({ pagination, documents }) => {
  return (
    <main className="shard-docs-main">
      {documents.map((document, i) => (
        <Document key={i} breadcrumbs={document.breadcrumbs} document={document.document} />
      ))}
      <Pagination pagination={pagination} />
    </main>
  );
};

Main.propTypes = {
  pagination: PaginationPropType,
  documents: PropTypes.arrayOf(DocumentPropType)
};
Main.defaultProps = {
  pagination: {},
  documents: []
};

export default Main;
