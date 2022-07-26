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
      {props.items.map((node, i) => {
        if (node.type === "document") {
          return <DocumentItem key={i} node={node} onNavigate={props.onNavigate} />;
        } else if (node.type === "link") {
          return <LinkItem key={i} node={node} />;
        } else if (node.type === "category") {
          return <CategoryItem key={i} node={node} onNavigate={props.onNavigate} />;
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
