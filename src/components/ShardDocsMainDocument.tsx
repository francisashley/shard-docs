import React from "react";
import PropTypes from "prop-types";
import ShardDocsMainBreadcrumbs from "./ShardDocsMainBreadcrumbs";
import { BreadcrumbPropType } from "../prop-types";

import "../assets/github.css";
import "./ShardDocsMainDocument.scss";
import "../assets/prism-github.css";

type props = {
  document: string | React.ReactNode,
  breadcrumbs: breadcrumb[]
}
const ShardDocsMainDocument = ({ document, breadcrumbs }: props) => {
  return (
    <article className="shard-docs-document">
      <ShardDocsMainBreadcrumbs breadcrumbs={breadcrumbs} />
      <div className="shard-docs-document-body markdown-body">{document}</div>
    </article>
  );
};

ShardDocsMainDocument.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbPropType).isRequired,
  document: PropTypes.element
};

ShardDocsMainDocument.defaultProps = {
  breadcrumbs: [],
  document: null
};

export default ShardDocsMainDocument;
