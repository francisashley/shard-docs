import React from "react";
import PropTypes from "prop-types";
import { HashRouter, BrowserRouter, Route } from "react-router-dom";
import { setActiveTreeNode, filterDocuments, setActiveCrumb } from "../utils";

import ShardDocsMain from "./ShardDocsMain";
import ShardDocsSidebar from "./ShardDocsSidebar";
import fromContent from "../adapters/fromContent";

import { ContentPropType } from "../prop-types";

import "../assets/sanitize.css";
import "./ShardDocs.scss";

/**
 * ShardDocs
 */

class ShardDocs extends React.Component {
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
    content: fromContent(this.props.content, this.props.basePath),
    tree: [],
    documents: []
  };

  componentDidMount() {
    const { tree, documents } = this.state.content;
    const path = this.props.location.pathname;

    this.setState({
      tree: setActiveTreeNode(tree, path),
      documents: filterDocuments(documents, path).map(document => setActiveCrumb(document, path))
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tree, documents } = this.state.content;
    const path = this.props.location.pathname;

    if (path !== prevProps.location.pathname) {
      this.setState({
        tree: setActiveTreeNode(tree, path),
        documents: filterDocuments(documents, path).map(document => setActiveCrumb(document, path))
      });
      window.scrollTo(0, 0);
    }
  }

  get pagination() {
    const location = this.props.location;
    const prevIndex =
      this.state.documents.findIndex(document => document.path === location.pathname) - 1;
    const nextIndex = this.state.documents.findIndex(doc => doc.path === location.pathname) + 1;
    const prevPage = this.state.documents[prevIndex];
    const nextPage = this.state.documents[nextIndex];
    const prev = prevPage && { text: prevPage.title, path: prevPage.path };
    const next = nextPage && { text: nextPage.title, path: nextPage.path };
    return { prev, next };
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
        <ShardDocsMain pagination={this.pagination} documents={this.state.documents} />
      </div>
    );
  }
}

export default props => {
  const Router = props.useBrowserRouter ? BrowserRouter : HashRouter;
  return (
    <Router>
      <Route component={routerProps => <ShardDocs {...{ ...props, ...routerProps }} />} />
    </Router>
  );
};
