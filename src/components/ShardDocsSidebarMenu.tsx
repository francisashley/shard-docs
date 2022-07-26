import React from "react";
import PropTypes from "prop-types";
import { ItemsPropType } from "../prop-types";
import ShardDocsSidebarMenuSection from "./ShardDocsSidebarMenuSection";
import "./ShardDocsSidebarMenu.scss";

type props = {
  showOnMobile: boolean,
  items: categoryItem[],
  onNavigate: () => void,
}

const ShardDocsSidebarMenu = (props: props) => {
  return (
    <div className="shard-docs-menu" data-show-on-mobile={props.showOnMobile}>
      {props.items.map((item, i) => (
        <ShardDocsSidebarMenuSection key={i} index={i} item={item} onNavigate={props.onNavigate} />
      ))}
    </div>
  );
};

ShardDocsSidebarMenu.propTypes = {
  items: ItemsPropType,
  showOnMobile: PropTypes.bool,
  onNavigate: PropTypes.func
};

ShardDocsSidebarMenu.defaultProps = {
  items: [],
  showOnMobile: false,
  onNavigate: () => {}
};

export default ShardDocsSidebarMenu;
