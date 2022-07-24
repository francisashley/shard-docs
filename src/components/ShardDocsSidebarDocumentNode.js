import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { DocumentPropType } from "../prop-types";
import FileIcon from "./icons/FileIcon";

/**
 * DocumentNode
 */
const DocumentNode = ({ node, onNavigate }) => {
  return (
    <li className="shard-docs-menu-document">
      <NavLink
        style={{ paddingLeft: node.depth * 15 + "px" }}
        className={classnames(node.isActive && "active")}
        onClick={e => (node.isEmpty ? e.preventDefault() : onNavigate())}
        disabled={node.isEmpty}
        to={node.path}
        exact
      >
        <FileIcon />
        {node.name}
      </NavLink>
    </li>
  );
};

DocumentNode.propTypes = {
  node: DocumentPropType,
  onNavigate: PropTypes.func
};

DocumentNode.defaultProps = {
  node: {},
  onNavigate: () => {}
};

export default DocumentNode;
