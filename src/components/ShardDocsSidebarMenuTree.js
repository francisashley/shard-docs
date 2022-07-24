import React from "react";
import PropTypes from "prop-types";
import DocumentNode from "./ShardDocsSidebarDocumentNode";
import LinkNode from "./ShardDocsSidebarLinkNode";
import CategoryNode from "./ShardDocsSidebarCategoryNode";
import { TreePropType } from "../prop-types";
import "./ShardDocsSidebarMenuTree.scss";

/**
 * MenuTree
 */

const MenuTree = ({ tree, onNavigate }) => {
  return (
    <>
      {tree.map((node, i) => {
        if (node.type === "document") {
          return <DocumentNode key={i} node={node} onNavigate={onNavigate} />;
        } else if (node.type === "link") {
          return <LinkNode key={i} node={node} />;
        } else if (node.type === "category") {
          return <CategoryNode key={i} node={node} onNavigate={onNavigate} />;
        }
      })}
    </>
  );
};

MenuTree.propTypes = {
  tree: TreePropType,
  onNavigate: PropTypes.func
};

MenuTree.defaultProps = {
  tree: [],
  onNavigate: () => {}
};

export default MenuTree;
