import React from "react";
import PropTypes from "prop-types";
import { ItemsPropType } from "../prop-types";
import MenuSection from "./ShardDocsSidebarMenuSection";
import "./ShardDocsSidebarMenu.scss";

type MenuProps = {
  showOnMobile: boolean,
  tree: categoryItem[],
  onNavigate: () => void,
}

const Menu = (props: MenuProps) => {
  return (
    <div className="shard-docs-menu" data-show-on-mobile={props.showOnMobile}>
      {props.tree.map((node, i) => (
        <MenuSection key={i} index={i} node={node} onNavigate={props.onNavigate} />
      ))}
    </div>
  );
};

Menu.propTypes = {
  tree: ItemsPropType,
  showOnMobile: PropTypes.bool,
  onNavigate: PropTypes.func
};

Menu.defaultProps = {
  tree: [],
  showOnMobile: false,
  onNavigate: () => {}
};

export default Menu;
