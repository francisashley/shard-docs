import React from "react";
import PropTypes from "prop-types";
import { HashRouter, BrowserRouter, Route } from "react-router-dom";
import { setActiveTreeNode, filterDocuments, setActiveCrumb } from "../utils";

import ShardDocsMain from "./ShardDocsMain";
import ShardDocsSidebar from "./ShardDocsSidebar";
import fromSource from "../adapters/fromSource";

import { SourcePropType } from "../prop-types";

import "../assets/sanitize.css";
import "./ShardDocs.scss";

/**
 * ShardDocs
 */

class ShardDocs extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    source: SourcePropType,
    basePath: PropTypes.string,
    hideBuiltWithShardDocs: PropTypes.bool,
    useBrowserRouter: PropTypes.bool
  };

  static defaultProps = {
    title: "",
    description: "",
    source: [],
    basePath: "/",
    hideBuiltWithShardDocs: false,
    useBrowserRouter: false
  };

  state = {
    source: fromSource(this.props.source, this.props.basePath),
    tree: [],
    documents: []
  };

  componentDidMount() {
    const { tree, documents } = this.state.source;
    const path = this.props.location.pathname;

    this.setState({
      tree: setActiveTreeNode(tree, path),
      documents: filterDocuments(documents, path).map(document => setActiveCrumb(document, path))
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tree, documents } = this.state.source;
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
    const app = {
      title: this.props.title,
      description: this.props.description,
      basePath: this.props.basePath,
      activePath: this.props.location.pathname
    };

    return (
      <div className="shard-docs">
        <ShardDocsSidebar
          app={app}
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
