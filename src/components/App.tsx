import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "../hoc/withRouter";

import AppMain from "./AppMain";
import AppSidebar from "./AppSidebar";
import dataTools from "../utils/dataTools";

import { ContentPropType } from "../prop-types";

import "../assets/sanitize.css";
import "./App.scss";

export type props = {
  title?: string,
  content?: content,
  basePath?: string,
  hideBuiltWithShardDocs?: boolean,
  routerType?: "hash" | "browser",
  currentPath?: string
}

const App = (props: props) => {
  const [basePath] = useState(props.basePath);
  const [currentPath, setCurrentPath] = useState(props.currentPath);
  const [content, setContent] = useState({ items: [], pages: [] } as { items: item[], pages: pageItem[] });
  const [menu, setMenu] = useState([] as item[]);
  const [currentPage, setCurrentPage] = useState(null as (pageItem | null));
  const [prevPage, setPrevPage] = useState(null as pageItem | null);
  const [nextPage, setNextPage] = useState(null as pageItem | null);

  useEffect(() => {
    const data = dataTools.parse(props.content || [], basePath)
    const pages = dataTools.getPages(data)
    setContent({ items: data, pages })
    setMenu(data);
    const currentPage = dataTools.filterPages(pages, props.currentPath)[0] || null;
    setCurrentPage(currentPage ? dataTools.setActiveCrumb(currentPage, props.currentPath) : null);

    const prevIndex = content.pages.findIndex((page: pageItem) => page.path === props.currentPath) - 1;
    setPrevPage(content.pages[prevIndex] ? content.pages[prevIndex] : null);
    
    const nextIndex = content.pages.findIndex((page: pageItem) => page.path === props.currentPath) + 1;
    setNextPage(content.pages[nextIndex] ? content.pages[nextIndex] : null);
  }, []);

  useEffect(() => {
    const prevPath = currentPath;

    if (props.currentPath !== prevPath) {
      setCurrentPath(props.currentPath);
      const currentPage = dataTools.filterPages(content.pages, props.currentPath)[0] || null;
      setCurrentPage(currentPage ? dataTools.setActiveCrumb(currentPage, props.currentPath) : null)
      setMenu(dataTools.setActiveMenuItem(content.items, props.currentPath) as categoryItem[])

      const prevIndex = content.pages.findIndex((page: pageItem) => page.path === props.currentPath) - 1;
      setPrevPage(content.pages[prevIndex] ? content.pages[prevIndex] : null);
      
      const nextIndex = content.pages.findIndex((page: pageItem) => page.path === props.currentPath) + 1;
      setNextPage(content.pages[nextIndex] ? content.pages[nextIndex] : null);

      window.scrollTo(0, 0);
    }
  }, [props.currentPath])


  return (
    <div className="sd-App">
      <AppSidebar
        title={props.title}
        basePath={props.basePath}
        items={menu as categoryItem[]}
        hideBuiltWithShardDocs={props.hideBuiltWithShardDocs}
      />
      <AppMain page={currentPage} prevPage={prevPage as paginationPage} nextPage={nextPage as paginationPage} />
    </div>
  );
}

App.propTypes = {
  title: PropTypes.string,
  content: ContentPropType,
  basePath: PropTypes.string,
  hideBuiltWithShardDocs: PropTypes.bool,
  routerType: PropTypes.string,
  currentPath: PropTypes.string,
};

App.defaultProps = {
  title: "",
  content: [],
  basePath: "/",
  hideBuiltWithShardDocs: false,
  routerType: "hash",
  currentPath: ''
};

export default withRouter<props>(App);