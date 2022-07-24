import React from "react";
import PropTypes from "prop-types";
import DocumentNode from "./ShardDocsSidebarDocumentNode";
import ExternalLinkNode from "./ShardDocsSidebarLinkExternalNode";
import FolderNode from "./ShardDocsSidebarFolderNode";
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
        } else if (node.type === "external-link") {
          return <ExternalLinkNode key={i} node={node} />;
        } else if (node.type === "folder") {
          return <FolderNode key={i} node={node} onNavigate={onNavigate} />;
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
