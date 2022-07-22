import React from "react";
import PropTypes from "prop-types";
import Pagination from "./Pagination";
import Document from "./Document";
import { PaginationPropType, DocumentPropType } from "../prop-types";
import "./Main.scss";

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
