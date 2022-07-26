import React from "react";
import PropTypes from "prop-types";
import DocumentItem from "./ShardDocsSidebarMenuDocument";
import LinkItem from "./ShardDocsSidebarMenuLink";
import CategoryItem from "./ShardDocsSidebarMenuCategory";
import { ItemsPropType } from "../prop-types";
import "./ShardDocsSidebarMenuTree.scss";

type MenuTreeProps = {
  items: item[],
  onNavigate: () => void
}

const MenuTree = (props: MenuTreeProps) => {
  return (
    <>
      {props.items.map((item, i) => {
        if (item.type === "document") {
          return <DocumentItem key={i} item={item} onNavigate={props.onNavigate} />;
        } else if (item.type === "link") {
          return <LinkItem key={i} item={item} />;
        } else if (item.type === "category") {
          return <CategoryItem key={i} item={item} onNavigate={props.onNavigate} />;
        }
      })}
    </>
  );
};

MenuTree.propTypes = {
  items: ItemsPropType,
  onNavigate: PropTypes.func
};

MenuTree.defaultProps = {
  items: [],
  onNavigate: () => {}
};

export default MenuTree;
