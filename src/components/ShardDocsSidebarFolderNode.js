import React from "react";
import PropTypes from "prop-types";
import { FolderPropType } from "../prop-types";
import MenuTree from "./ShardDocsSidebarMenuTree";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import BaseLink from "@fa-repo/base-react/dist/link";
import TriangleArrowDown from "./icons/TriangleArrowDown";
import TriangleArrowRight from "./icons/TriangleArrowRight";
import sessionDB from "../utils/sessionDB";

/**
 * FolderNode
 */

class FolderNode extends React.Component {
  state = {
    sessionId: "fa-repo-shard-docs-menu-folder-expanded" + this.props.node.path,
    expanded: true
  };

  componentDidMount() {
    this.setState({
      expanded: sessionDB.get(this.state.sessionId, true)
    });
  }

  toggleFolder = () => {
    sessionDB.set(this.state.sessionId, !this.state.expanded);

    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { node, onNavigate } = this.props;

    return (
      <ul className="shard-docs-menu-folder">
        {node.name && (
          <li className="shard-docs-menu-folder-header">
            <BaseLink
              style={{ paddingLeft: node.depth * 15 + "px" }}
              onClick={this.toggleFolder}
              disabled={node.isEmpty}
            >
              {this.state.expanded ? <TriangleArrowDown /> : <TriangleArrowRight />}
              {node.name}
            </BaseLink>
          </li>
        )}
        {this.state.expanded && <MenuTree tree={node.items} onNavigate={onNavigate} />}
      </ul>
    );
  }
}

FolderNode.propTypes = {
  node: FolderPropType,
  onNavigate: PropTypes.func
};

FolderNode.defaultProps = {
  node: {},
  onNavigate: () => {}
};

export default FolderNode;
