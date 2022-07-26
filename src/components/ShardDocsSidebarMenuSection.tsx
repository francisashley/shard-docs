import React from "react";
import PropTypes from "prop-types";
import { CategoryItemPropType } from "../prop-types";
import ShardDocsSidebarMenuTree from "./ShardDocsSidebarMenuTree";
import sessionDB from "../utils/sessionDB";
import classnames from "classnames";
import ShardDocsSidebarMenuSectionHeader from "./ShardDocsSidebarMenuSectionHeader";
import "./ShardDocsSidebarMenuSection.scss";

type props = {
  index: number,
  item: categoryItem,
  onNavigate: () => void,
}

type state = {
  expanded: boolean
}

class ShardDocsSidebarMenuSection extends React.Component<props, state> {
  static propTypes = {
    index: PropTypes.number,
    item: CategoryItemPropType,
    onNavigate: PropTypes.func
  };
  
  static defaultProps = {
    index: 0,
    item: {},
    onNavigate: () => {}
  };

  state = {
    expanded: sessionDB.get(this.sessionId, this.props.index === 0 ? true : false)
  };

  get sessionId() {
    return "fa-repo-shard-docs-menu-section-expanded" + (this.props.item.path || "");
  }

  toggle = () => {
    sessionDB.set(this.sessionId, !this.state.expanded);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const props = this.props;
    const collapsible = Boolean(props.item.name);
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
          <ShardDocsSidebarMenuSectionHeader title={props.item.name || ''} expanded={expanded} onToggle={this.toggle} />
        )}
        {showMenu && (
          <ul>
            <ShardDocsSidebarMenuTree items={props.item.items} onNavigate={props.onNavigate} />
          </ul>
        )}
      </section>
    );
  }
}

export default ShardDocsSidebarMenuSection;
