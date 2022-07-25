import React from "react";
import PropTypes from "prop-types";
import ArrowDown from "./icons/ArrowDown";
import ArrowRight from "./icons/ArrowRight";
import BaseLink from "@fa-repo/base-react/dist/link";
import "./ShardDocsSidebarMenuSectionHeader.scss";

type MenuSectionHeaderProps = {
  title: string,
  expanded: boolean,
  onClick: () => void,
  onToggle: () => void
}

class MenuSectionHeader extends React.Component<MenuSectionHeaderProps> {
  static propTypes = {
    title: PropTypes.string,
    expanded: PropTypes.bool,
    onToggle: PropTypes.func
  };
  
  static defaultProps = {
    title: "",
    expanded: false,
    onNavigate: () => {}
  };

  render() {
    const props = this.props;

    return (
      <header className="shard-docs-menu-section-header">
        <BaseLink href="#" preventDefault onClick={props.onToggle}>
          <h3>{props.title}</h3>
          {props.expanded ? <ArrowDown /> : <ArrowRight />}
        </BaseLink>
      </header>
    );
  }
}

export default MenuSectionHeader;
