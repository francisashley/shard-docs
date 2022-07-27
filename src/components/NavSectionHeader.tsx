import React from "react";
import PropTypes from "prop-types";
import ArrowDown from "./icons/ArrowDown";
import ArrowRight from "./icons/ArrowRight";
import BaseLink from "@fa-repo/base-react/dist/link";
import "./NavSectionHeader.scss";

type props = {
  title?: string,
  expanded?: boolean,
  onClick?: () => void,
  onToggle?: () => void
}

class NavSectionHeader extends React.Component<props> {
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
      <header className="sd-NavSectionHeader">
        <BaseLink href="#" preventDefault onClick={props.onToggle}>
          <h3>{props.title}</h3>
          {props.expanded ? <ArrowDown /> : <ArrowRight />}
        </BaseLink>
      </header>
    );
  }
}

export default NavSectionHeader;
