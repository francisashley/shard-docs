import React from "react";
import PropTypes from "prop-types";
import DocumentNode from "./ShardDocsSidebarDocumentNode";
import LinkNode from "./ShardDocsSidebarLinkNode";
import CategoryNode from "./ShardDocsSidebarCategoryNode";
import { TreePropType } from "../prop-types";
import "./ShardDocsSidebarMenuTree.scss";
import { contentItemCategory, contentItemDocument, contentItemLink } from "../utils/contentTool";

type MenuTreeProps = {
  tree: (contentItemCategory | contentItemDocument | contentItemLink)[],
  onNavigate: () => void
}

const MenuTree = (props: MenuTreeProps) => {
  return (
    <>
      {props.tree.map((node, i) => {
        if (node.type === "document") {
          return <DocumentNode key={i} node={node} onNavigate={props.onNavigate} />;
        } else if (node.type === "link") {
          return <LinkNode key={i} node={node} />;
        } else if (node.type === "category") {
          return <CategoryNode key={i} node={node} onNavigate={props.onNavigate} />;
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
