import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "../hoc/withRouter";

import AppMain from "./AppMain";
import AppSidebar from "./AppSidebar";
import dataTools from "../utils/dataTools";

import { DataPropType } from "../prop-types";

import "../assets/sanitize.css";
import "./App.scss";

export type props = {
  title?: string,
  data?: inputData,
  basePath?: string,
  hideBuiltWithShardDocs?: boolean,
  routerType?: "hash" | "browser",
  currentPath?: string
}

const App = (props: props) => {
  const [currentPath, setCurrentPath] = useState(props.currentPath);
  const [data, setData] = useState(dataTools.parse(props.data || [], props.basePath) as data);
  const [pages, setPages] = useState([] as page[]);
  const [currentPage, setCurrentPage] = useState(null as (page | null));
  const [prevPage, setPrevPage] = useState(null as page | null);
  const [nextPage, setNextPage] = useState(null as page | null);

  useEffect(() => {
    const data = dataTools.parse(props.data || [], props.basePath)
    const pages = dataTools.getPages(data)
    setData(data)
    setPages(pages)
    setCurrentPage(dataTools.getCurrentPage(pages, props.currentPath || ''));
    setPrevPage(dataTools.getPrevPage(pages, props.currentPath || ''));
    setNextPage(dataTools.getNextPage(pages, props.currentPath || ''));
  }, []);

  useEffect(() => {
    const prevPath = currentPath;

    if (props.currentPath !== prevPath) {
      const updatedData = dataTools.setActiveMenuItem(data, props.currentPath);
      setCurrentPath(props.currentPath);
      setData(updatedData)
      setCurrentPage(dataTools.getCurrentPage(pages, props.currentPath || ''));
      setPrevPage(dataTools.getPrevPage(pages, props.currentPath || ''));
      setNextPage(dataTools.getNextPage(pages, props.currentPath || ''));
      window.scrollTo(0, 0);
    }
  }, [props.currentPath])


  return (
    <div className="sd-App">
      <AppSidebar
        title={props.title}
        basePath={props.basePath}
        items={data as category[]}
        hideBuiltWithShardDocs={props.hideBuiltWithShardDocs}
      />
      <AppMain page={currentPage} prevPage={prevPage as paginationPage} nextPage={nextPage as paginationPage} />
    </div>
  );
}

App.propTypes = {
  title: PropTypes.string,
  data: DataPropType,
  basePath: PropTypes.string,
  hideBuiltWithShardDocs: PropTypes.bool,
  routerType: PropTypes.string,
  currentPath: PropTypes.string,
};

App.defaultProps = {
  title: "",
  data: [],
  basePath: "/",
  hideBuiltWithShardDocs: false,
  routerType: "hash",
  currentPath: ""
};

export default withRouter<props>(App);