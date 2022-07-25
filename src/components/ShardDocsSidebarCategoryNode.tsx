import React from "react";
import PropTypes from "prop-types";
import { CategoryPropType } from "../prop-types";
import MenuTree from "./ShardDocsSidebarMenuTree";
import BaseLink from "@fa-repo/base-react/dist/link";
import TriangleArrowDown from "./icons/TriangleArrowDown";
import TriangleArrowRight from "./icons/TriangleArrowRight";
import sessionDB from "../utils/sessionDB";

type CategoryNodeProps = {
  node: contentItemCategory,
  onNavigate: () => void
}
type CategoryNodeState = {
  sessionId: string,
  expanded: boolean
}

class CategoryNode extends React.Component<CategoryNodeProps, CategoryNodeState> {
  static propTypes = {
    node: CategoryPropType,
    onNavigate: PropTypes.func
  };
  
  static defaultProps = {
    node: {},
    onNavigate: () => {}
  };

  state = {
    sessionId: "fa-repo-shard-docs-menu-category-expanded" + this.props.node.path,
    expanded: true
  };

  componentDidMount() {
    this.setState({
      expanded: sessionDB.get(this.state.sessionId, true)
    });
  }

  toggleCategory = () => {
    sessionDB.set(this.state.sessionId, !this.state.expanded);

    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { node, onNavigate } = this.props;

    return (
      <ul className="shard-docs-menu-category">
        {node.name && (
          <li className="shard-docs-menu-category-header">
            <BaseLink
              style={{ paddingLeft: node.depth * 15 + "px" }}
              onClick={this.toggleCategory}
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

export default CategoryNode;
