import React from "react";
import PropTypes from "prop-types";
import ShardDocsSidebarMenuDocument from "./ShardDocsSidebarMenuDocument";
import ShardDocsSidebarMenuLink from "./ShardDocsSidebarMenuLink";
import ShardDocsSidebarMenuCategory from "./ShardDocsSidebarMenuCategory";
import { ItemsPropType } from "../prop-types";
import "./ShardDocsSidebarMenuTree.scss";

type props = {
  items: item[],
  onNavigate: () => void
}

const ShardDocsSidebarMenuTree = (props: props) => {
  return (
    <>
      {props.items.map((item, i) => {
        if (item.type === "document") {
          return <ShardDocsSidebarMenuDocument key={i} item={item} onNavigate={props.onNavigate} />;
        } else if (item.type === "link") {
          return <ShardDocsSidebarMenuLink key={i} item={item} />;
        } else if (item.type === "category") {
          return <ShardDocsSidebarMenuCategory key={i} item={item} onNavigate={props.onNavigate} />;
        }
      })}
    </>
  );
};

ShardDocsSidebarMenuTree.propTypes = {
  items: ItemsPropType,
  onNavigate: PropTypes.func
};

ShardDocsSidebarMenuTree.defaultProps = {
  items: [],
  onNavigate: () => {}
};

export default ShardDocsSidebarMenuTree;
