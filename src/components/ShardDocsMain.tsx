import React from "react";
import PropTypes from "prop-types";
import ShardDocsMainPagination from "./ShardDocsMainPagination";
import ShardDocsMainDocument from "./ShardDocsMainDocument";
import { PagePropType, DocumentItemPropType } from "../prop-types";
import "./ShardDocsMain.scss";

type props = {
  documents: documentItem[],
  prevPage?: paginationPage,
  nextPage?: paginationPage,
}

const ShardDocsMain = (props: props) => {
  const showPagination = Boolean(props.prevPage || props.nextPage);
  return (
    <main className="shard-docs-main">
      {props.documents.map((document, i) => (
        <ShardDocsMainDocument key={i} breadcrumbs={document.breadcrumbs} document={document.document} />
      ))}
     { showPagination && <ShardDocsMainPagination prevPage={props.prevPage} nextPage={props.nextPage} />}
    </main>
  );
};

ShardDocsMain.propTypes = {
  prevPage: PagePropType,
  nextPage: PagePropType,
  documents: PropTypes.arrayOf(DocumentItemPropType)
};
ShardDocsMain.defaultProps = {
  prevPage: null,
  nextPage: null,
  documents: []
};

export default ShardDocsMain;
