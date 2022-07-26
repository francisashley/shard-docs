import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { DocumentItemPropType } from "../prop-types";
import FileIcon from "./icons/FileIcon";

type DocumentNodeProps = {
  node: documentItem;
  onNavigate: () => void;
}

const DocumentNode = (props: DocumentNodeProps) => {
  return (
    <li className="shard-docs-menu-document">
      <NavLink
        style={{ paddingLeft: props.node.depth * 15 + "px" }}
        className={classnames(props.node.isActive && "active")}
        onClick={e => (props.node.isEmpty ? e.preventDefault() : props.onNavigate())}
        to={props.node.path}
        exact
      >
        <FileIcon />
        {props.node.name}
      </NavLink>
    </li>
  );
};

DocumentNode.propTypes = {
  node: DocumentItemPropType,
  onNavigate: PropTypes.func
};

DocumentNode.defaultProps = {
  node: {},
  onNavigate: () => {}
};

export default DocumentNode;
