import React from "react";
import PropTypes from "prop-types";
import DocumentItem from "./ShardDocsSidebarMenuDocument";
import LinkItem from "./ShardDocsSidebarMenuLink";
import CategoryItem from "./ShardDocsSidebarMenuCategory";
import { ItemsPropType } from "../prop-types";
import "./ShardDocsSidebarMenuTree.scss";

type MenuTreeProps = {
  tree: item[],
  onNavigate: () => void
}

const MenuTree = (props: MenuTreeProps) => {
  return (
    <>
      {props.tree.map((node, i) => {
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
  tree: ItemsPropType,
  onNavigate: PropTypes.func
};

MenuTree.defaultProps = {
  tree: [],
  onNavigate: () => {}
};

export default MenuTree;
