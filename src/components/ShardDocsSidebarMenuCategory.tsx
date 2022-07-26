import React from "react";
import PropTypes from "prop-types";
import { CategoryItemPropType } from "../prop-types";
import MenuTree from "./ShardDocsSidebarMenuTree";
import BaseLink from "@fa-repo/base-react/dist/link";
import TriangleArrowDown from "./icons/TriangleArrowDown";
import TriangleArrowRight from "./icons/TriangleArrowRight";
import sessionDB from "../utils/sessionDB";

type CategoryNodeProps = {
  item: categoryItem,
  onNavigate: () => void
}
type CategoryNodeState = {
  sessionId: string,
  expanded: boolean
}

class CategoryNode extends React.Component<CategoryNodeProps, CategoryNodeState> {
  static propTypes = {
    item: CategoryItemPropType,
    onNavigate: PropTypes.func
  };
  
  static defaultProps = {
    item: {},
    onNavigate: () => {}
  };

  state = {
    sessionId: "fa-repo-shard-docs-menu-category-expanded" + this.props.item.path,
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
    const { item, onNavigate } = this.props;

    return (
      <ul className="shard-docs-menu-category">
        {item.name && (
          <li className="shard-docs-menu-category-header">
            <BaseLink
              style={{ paddingLeft: item.depth * 15 + "px" }}
              onClick={this.toggleCategory}
              disabled={item.isEmpty}
            >
              {this.state.expanded ? <TriangleArrowDown /> : <TriangleArrowRight />}
              {item.name}
            </BaseLink>
          </li>
        )}
        {this.state.expanded && <MenuTree items={item.items} onNavigate={onNavigate} />}
      </ul>
    );
  }
}

export default CategoryNode;
