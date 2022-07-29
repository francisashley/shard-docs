import React from "react";
import PropTypes from "prop-types";
import MainBreadcrumbs from "./MainBreadcrumbs";
import { BreadcrumbPropType } from "../prop-types";

import "../assets/github.css";
import "./MainContent.scss";
import "../assets/prism-github.css";

type props = {
  content: string | React.ReactNode,
  breadcrumbs: breadcrumb[]
}
const MainContent = ({ content, breadcrumbs }: props) => {
  return (
    <article className="sd-MainContent">
      <MainBreadcrumbs breadcrumbs={breadcrumbs} />
      <div className="sd-MainContent__body markdown-body">{content}</div>
    </article>
  );
};

MainContent.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbPropType).isRequired,
  content: PropTypes.element
};

MainContent.defaultProps = {
  breadcrumbs: [],
  content: null
};

export default MainContent;
