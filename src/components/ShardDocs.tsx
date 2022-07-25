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
  documents: documentItem[],
  tree: (categoryItem | documentItem | linkItem)[],
  content: {
    tree: (categoryItem | documentItem | linkItem)[],
    documents: documentItem[]
  }
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
    content: contentTool.parseContent(this.props.content, this.props.basePath),
    tree: [],
    documents: []
  };

  componentDidMount() {
    const { tree, documents } = this.state.content;
    const path = this.props.routerProps.location?.pathname || '';

    this.setState({
      tree: setActiveTreeNode(tree, path),
      documents: filterDocuments(documents, path).map(document => setActiveCrumb(document, path))
    });
  }

  componentDidUpdate(prevProps: any) {
    const { tree, documents } = this.state.content;
    const path = this.props.routerProps.location?.pathname || '';

    if (path !== prevProps.location.pathname) {
      this.setState({
        tree: setActiveTreeNode(tree, path),
        documents: filterDocuments(documents, path).map(document => setActiveCrumb(document, path))
      });
      window.scrollTo(0, 0);
    }
  }

  get prevPage() {
    const location = this.props.routerProps.location;
    const prevIndex = this.state.documents.findIndex((document: documentItem) => document.path === location?.pathname) - 1;
    const prevPage = this.state.documents[prevIndex] as documentItem | undefined;
    return prevPage && { name: prevPage.name, path: prevPage.path };
  }

  get nextPage() {
    const location = this.props.routerProps.location;
    const nextIndex = this.state.documents.findIndex((document: documentItem) => document.path === location?.pathname) + 1;
    const nextPage = this.state.documents[nextIndex] as documentItem | undefined;
    return nextPage && { name: nextPage.name, path: nextPage.path };
  }

  render() {
    return (
      <div className="shard-docs">
        <ShardDocsSidebar
          title={this.props.title}
          description={this.props.description}
          basePath={this.props.basePath}
          tree={this.state.tree}
          hideBuiltWithShardDocs={this.props.hideBuiltWithShardDocs}
        />
        <ShardDocsMain documents={this.state.documents} prevPage={this.prevPage} nextPage={this.nextPage} />
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
