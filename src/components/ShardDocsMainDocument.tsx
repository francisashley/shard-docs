import React from "react";
import PropTypes from "prop-types";
import Breadcrumbs from "./ShardDocsMainBreadcrumbs";
import { BreadcrumbPropType } from "../prop-types";

import "../assets/github.css";
import "./ShardDocsMainDocument.scss";
import "../assets/prism-github.css";

type DocumentProps = {
  document: string | React.ReactNode,
  breadcrumbs: breadcrumb[]
}
const Document = ({ document, breadcrumbs }: DocumentProps) => {
  return (
    <article className="shard-docs-document">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="shard-docs-document-body markdown-body">{document}</div>
    </article>
  );
};

Document.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbPropType).isRequired,
  document: PropTypes.element
};

Document.defaultProps = {
  breadcrumbs: [],
  document: null
};

export default Document;
