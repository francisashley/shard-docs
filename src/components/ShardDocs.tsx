import React from "react";
import PropTypes from "prop-types";
import { HashRouter, BrowserRouter, Route, RouteProps } from "react-router-dom";
import { setActiveTreeNode, filterDocuments, setActiveCrumb } from "../utils";

import ShardDocsMain from "./ShardDocsMain";
import ShardDocsSidebar from "./ShardDocsSidebar";
import contentTool from "../utils/contentTool";

import { ContentPropType } from "../prop-types";

import "../assets/sanitize.css";
import "./ShardDocs.scss";

type ShardDocsProps = {
  title: string,
  description: string,
  content: content,
  basePath: string,
  hideBuiltWithShardDocs: boolean,
  useBrowserRouter: boolean,
  routerProps: RouteProps
}

type ShardDocsState = {
  currentPath: string,
  documentsData: documentItem[],
  treeData: item[],
}

class ShardDocs extends React.Component<ShardDocsProps, ShardDocsState> {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    content: ContentPropType,
    basePath: PropTypes.string,
    hideBuiltWithShardDocs: PropTypes.bool,
    useBrowserRouter: PropTypes.bool
  };

  static defaultProps = {
    title: "",
    description: "",
    content: [],
    basePath: "/",
    hideBuiltWithShardDocs: false,
    useBrowserRouter: false
  };

  state = {
    currentPath: this.props.routerProps.location?.pathname || '',
    treeData: [],
    documentsData: []
  };

  componentDidMount() {
    const currentPath = this.props.routerProps.location?.pathname || '';
    const { tree, documents } = contentTool.parseContent(this.props.content, this.props.basePath)

    this.setState({
      currentPath,
      treeData: tree,
      documentsData: documents,
    });
  }

  componentDidUpdate(prevProps: any) {
    const currentPath = this.props.routerProps.location?.pathname || '';

    if (currentPath !== prevProps.location.pathname) {
      this.setState({ currentPath });
      window.scrollTo(0, 0);
    }
  }

  get getDocuments() {
    return filterDocuments(this.state.documentsData, this.state.currentPath)
      .map(document => setActiveCrumb(document, this.state.currentPath))
  }

  get getTreeData() {
    return setActiveTreeNode(this.state.treeData, this.state.currentPath) as categoryItem[]
  }

  get prevPage() {
    const location = this.props.routerProps.location;
    const prevIndex = this.getDocuments.findIndex((document: documentItem) => document.path === location?.pathname) - 1;
    const prevPage = this.getDocuments[prevIndex] as documentItem | undefined;
    return prevPage && { name: prevPage.name, path: prevPage.path };
  }

  get nextPage() {
    const location = this.props.routerProps.location;
    const nextIndex = this.getDocuments.findIndex((document: documentItem) => document.path === location?.pathname) + 1;
    const nextPage = this.getDocuments[nextIndex] as documentItem | undefined;
    return nextPage && { name: nextPage.name, path: nextPage.path };
  }

  render() {
    return (
      <div className="shard-docs">
        <ShardDocsSidebar
          title={this.props.title}
          description={this.props.description}
          basePath={this.props.basePath}
          tree={this.getTreeData}
          hideBuiltWithShardDocs={this.props.hideBuiltWithShardDocs}
        />
        <ShardDocsMain documents={this.getDocuments} prevPage={this.prevPage} nextPage={this.nextPage} />
      </div>
    );
  }
}

type indexProps = {
  title?: string,
  description?: string,
  content?: content,
  basePath?: string,
  hideBuiltWithShardDocs?: boolean,
  useBrowserRouter?: boolean
}
export default (props: indexProps) => {
  const Router = (props.useBrowserRouter ? BrowserRouter : HashRouter) as React.ElementType;
  return (
    <Router>
      <Route component={(routerProps: RouteProps) => <ShardDocs {...{ ...props, ...routerProps }} routerProps={routerProps} />} />
    </Router>
  );
};
