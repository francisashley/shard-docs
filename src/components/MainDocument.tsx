import React from "react";
import PropTypes from "prop-types";
import MainBreadcrumbs from "./MainBreadcrumbs";
import { BreadcrumbPropType } from "../prop-types";

import "../assets/github.css";
import "./MainDocument.scss";
import "../assets/prism-github.css";

type props = {
  document: string | React.ReactNode,
  breadcrumbs: breadcrumb[]
}
const MainDocument = ({ document, breadcrumbs }: props) => {
  return (
    <article className="sd-MainDocument">
      <MainBreadcrumbs breadcrumbs={breadcrumbs} />
      <div className="sd-MainDocument__body markdown-body">{document}</div>
    </article>
  );
};

MainDocument.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbPropType).isRequired,
  document: PropTypes.element
};

MainDocument.defaultProps = {
  breadcrumbs: [],
  document: null
};

export default MainDocument;
