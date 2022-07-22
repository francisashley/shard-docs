import React from "react";
import PropTypes from "prop-types";
import SidebarHeader from "../Header";
import SidebarDescription from "../Description";
import SidebarMenu from "../Menu";
import BuiltWithShardDocs from "../BuiltWithShardDocs";
import { AppPropType, TreePropType } from "../../prop-types";
import "./Sidebar.scss";

/**
 * Sidebar
 */

class Sidebar extends React.Component {
  static propTypes = {
    app: AppPropType,
    title: PropTypes.string,
    description: PropTypes.string,
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
    const { app, tree, hideBuiltWithShardDocs } = this.props;
    const showBuiltWithShardDocs = !hideBuiltWithShardDocs;

    return (
      <aside className="shard-docs-sidebar">
        <SidebarHeader
          title={app.title}
          description={app.description}
          basePath={app.basePath}
          onToggleMenu={() => this.setState({ showMenuOnMobile: !this.state.showMenuOnMobile })}
        />
        {app.description && <SidebarDescription description={app.description} />}
        <SidebarMenu
          tree={tree}
          showOnMobile={this.state.showMenuOnMobile}
          onNavigate={() => this.setState({ showMenuOnMobile: false })}
        />
        {showBuiltWithShardDocs && <BuiltWithShardDocs />}
      </aside>
    );
  }
}

export default Sidebar;
