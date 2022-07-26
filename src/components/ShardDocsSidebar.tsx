import React from "react";
import PropTypes from "prop-types";
import ShardDocsSidebarHeader from "./ShardDocsSidebarHeader";
import ShardDocsSidebarDescription from "./ShardDocsSidebarDescription";
import ShardDocsSidebarMenu from "./ShardDocsSidebarMenu";
import ShardDocsSidebarBuiltWithShardDocs from "./ShardDocsSidebarBuiltWithShardDocs";
import { ItemsPropType } from "../prop-types";
import "./ShardDocsSidebar.scss";

type props = {
  title?: string,
  description?: string,
  basePath?: string,
  items: categoryItem[],
  hideBuiltWithShardDocs: boolean,
}

type state = {
  showMenuOnMobile: boolean,
}

class ShardDocsSidebar extends React.Component<props, state> {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    basePath: PropTypes.string,
    items: ItemsPropType,
    hideBuiltWithShardDocs: PropTypes.bool
  };

  static defaultProps = {
    app: {},
    title: "",
    description: "",
    items: [],
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
        <ShardDocsSidebarHeader
          title={props.title}
          description={props.description}
          basePath={props.basePath}
          onToggleMenu={() => this.setState({ showMenuOnMobile: !this.state.showMenuOnMobile })}
        />
        {props.description && <ShardDocsSidebarDescription description={props.description} />}
        <ShardDocsSidebarMenu
          items={props.items}
          showOnMobile={this.state.showMenuOnMobile}
          onNavigate={() => this.setState({ showMenuOnMobile: false })}
        />
        {showBuiltWithShardDocs && <ShardDocsSidebarBuiltWithShardDocs />}
      </aside>
    );
  }
}

export default ShardDocsSidebar;
