import React from "react";
import PropTypes from "prop-types";
import { CategoryPropType } from "../prop-types";
import MenuTree from "./ShardDocsSidebarMenuTree";
import sessionDB from "../utils/sessionDB";
import classnames from "classnames";
import MenuSectionHeader from "./ShardDocsSidebarMenuSectionHeader";
import "./ShardDocsSidebarMenuSection.scss";

type MenuSectionProps = {
  index: number,
  node: categoryItem,
  onNavigate: () => void,
}
type MenuSectionState = {
  expanded: boolean
}

class MenuSection extends React.Component<MenuSectionProps, MenuSectionState> {
  static propTypes = {
    index: PropTypes.number,
    node: CategoryPropType,
    onNavigate: PropTypes.func
  };
  
  static defaultProps = {
    index: 0,
    node: {},
    onNavigate: () => {}
  };

  state = {
    expanded: sessionDB.get(this.sessionId, this.props.index === 0 ? true : false)
  };

  get sessionId() {
    return "fa-repo-shard-docs-menu-section-expanded" + (this.props.node.path || "");
  }

  toggle = () => {
    sessionDB.set(this.sessionId, !this.state.expanded);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const props = this.props;
    const collapsible = Boolean(props.node.name);
    const expanded = this.state.expanded;

    const className = classnames(
      "shard-docs-menu-section",
      collapsible && "collapsible",
      expanded && "expanded"
    );

    // Ignore `expanded` value if section is discrete.
    const showMenu = collapsible ? expanded : true;

    return (
      <section className={className}>
        {collapsible && (
          <MenuSectionHeader title={props.node.name || ''} expanded={expanded} onToggle={this.toggle} />
        )}
        {showMenu && (
          <ul>
            <MenuTree tree={props.node.items} onNavigate={props.onNavigate} />
          </ul>
        )}
      </section>
    );
  }
}

export default MenuSection;
