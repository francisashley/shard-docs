import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { DocumentItemPropType } from "../prop-types";
import FileIcon from "./icons/FileIcon";

type DocumentNodeProps = {
  item: documentItem;
  onNavigate: () => void;
}

const DocumentNode = (props: DocumentNodeProps) => {
  return (
    <li className="shard-docs-menu-document">
      <NavLink
        style={{ paddingLeft: props.item.depth * 15 + "px" }}
        className={classnames(props.item.isActive && "active")}
        onClick={e => (props.item.isEmpty ? e.preventDefault() : props.onNavigate())}
        to={props.item.path}
        exact
      >
        <FileIcon />
        {props.item.name}
      </NavLink>
    </li>
  );
};

DocumentNode.propTypes = {
  item: DocumentItemPropType,
  onNavigate: PropTypes.func
};

DocumentNode.defaultProps = {
  item: {},
  onNavigate: () => {}
};

export default DocumentNode;
