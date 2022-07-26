import React from "react";
import PropTypes from "prop-types";
import { ItemsPropType } from "../prop-types";
import MenuSection from "./ShardDocsSidebarMenuSection";
import "./ShardDocsSidebarMenu.scss";

type MenuProps = {
  showOnMobile: boolean,
  items: categoryItem[],
  onNavigate: () => void,
}

const Menu = (props: MenuProps) => {
  return (
    <div className="shard-docs-menu" data-show-on-mobile={props.showOnMobile}>
      {props.items.map((item, i) => (
        <MenuSection key={i} index={i} item={item} onNavigate={props.onNavigate} />
      ))}
    </div>
  );
};

Menu.propTypes = {
  items: ItemsPropType,
  showOnMobile: PropTypes.bool,
  onNavigate: PropTypes.func
};

Menu.defaultProps = {
  items: [],
  showOnMobile: false,
  onNavigate: () => {}
};

export default Menu;
