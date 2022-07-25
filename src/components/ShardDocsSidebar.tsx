import React from "react";
import PropTypes from "prop-types";
import SidebarHeader from "./ShardDocsSidebarHeader";
import SidebarDescription from "./ShardDocsSidebarDescription";
import SidebarMenu from "./ShardDocsSidebarMenu";
import BuiltWithShardDocs from "./ShardDocsSidebarBuiltWithShardDocs";
import { TreePropType } from "../prop-types";
import "./ShardDocsSidebar.scss";

type SidebarProps = {
  title?: string,
  description?: string,
  basePath?: string,
  tree: categoryItem[],
  hideBuiltWithShardDocs: boolean,
}

type SidebarState = {
  showMenuOnMobile: boolean,
}

class Sidebar extends React.Component<SidebarProps,SidebarState> {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    basePath: PropTypes.string,
    tree: TreePropType,
    hideBuiltWithShardDocs: PropTypes.bool
  };

  static defaultProps = {
    app: {},
    title: "",
    description: "",
    tree: [],
    hideBuiltWithShardDocs: false
  };

  state = {
    showMenuOnMobile: false
  };

  render() {
    const props = this.props;
    const showBuiltWithShardDocs = !props.hideBuiltWithShardDocs;
    return (
      <aside className="shard-docs-sidebar">
        <SidebarHeader
          title={props.title}
          description={props.description}
          basePath={props.basePath}
          onToggleMenu={() => this.setState({ showMenuOnMobile: !this.state.showMenuOnMobile })}
        />
        {props.description && <SidebarDescription description={props.description} />}
        <SidebarMenu
          tree={props.tree}
          showOnMobile={this.state.showMenuOnMobile}
          onNavigate={() => this.setState({ showMenuOnMobile: false })}
        />
        {showBuiltWithShardDocs && <BuiltWithShardDocs />}
      </aside>
    );
  }
}

export default Sidebar;
