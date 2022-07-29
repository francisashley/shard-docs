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
  const [content, setContent] = useState({ items: [], documents: [] } as { items: item[], documents: documentItem[] });
  const [menu, setMenu] = useState([] as item[]);
  const [currentDocument, setCurrentDocument] = useState(null as (documentItem | null));
  const [prevPage, setPrevPage] = useState(null as documentItem | null);
  const [nextPage, setNextPage] = useState(null as documentItem | null);

  useEffect(() => {
    const data = dataTools.parse(props.content || [], basePath)
    const documents = dataTools.getDocuments(data)
    setContent({ items: data, documents })
    setMenu(data);
    const currentDocument = dataTools.filterDocuments(documents, props.currentPath)[0] || null;
    setCurrentDocument(currentDocument ? dataTools.setActiveCrumb(currentDocument, props.currentPath) : null);

    const prevIndex = content.documents.findIndex((document: documentItem) => document.path === props.currentPath) - 1;
    setPrevPage(content.documents[prevIndex] ? content.documents[prevIndex] : null);
    
    const nextIndex = content.documents.findIndex((document: documentItem) => document.path === props.currentPath) + 1;
    setNextPage(content.documents[nextIndex] ? content.documents[nextIndex] : null);
  }, []);

  useEffect(() => {
    const prevPath = currentPath;

    if (props.currentPath !== prevPath) {
      setCurrentPath(props.currentPath);
      const currentDocument = dataTools.filterDocuments(content.documents, props.currentPath)[0] || null;
      setCurrentDocument(currentDocument ? dataTools.setActiveCrumb(currentDocument, props.currentPath) : null)
      setMenu(dataTools.setActiveMenuItem(content.items, props.currentPath) as categoryItem[])

      const prevIndex = content.documents.findIndex((document: documentItem) => document.path === props.currentPath) - 1;
      setPrevPage(content.documents[prevIndex] ? content.documents[prevIndex] : null);
      
      const nextIndex = content.documents.findIndex((document: documentItem) => document.path === props.currentPath) + 1;
      setNextPage(content.documents[nextIndex] ? content.documents[nextIndex] : null);

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
      <AppMain document={currentDocument} prevPage={prevPage as paginationPage} nextPage={nextPage as paginationPage} />
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