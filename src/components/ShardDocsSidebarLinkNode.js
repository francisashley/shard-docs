import React from "react";
import PropTypes from "prop-types";
import ExternalIcon from "./icons/LinkExternal";
import { LinkPropType } from "../prop-types";

/**
 * ExternalLinkNode
 */

const ExternalLinkNode = ({ node }) => (
  <li className="shard-docs-menu-external">
    <a href={node.url} target="_blank" style={{ paddingLeft: node.depth * 15 + "px" }}>
      <ExternalIcon />
      {node.name}
    </a>
  </li>
);

ExternalLinkNode.propTypes = {
  node: LinkPropType
};

ExternalLinkNode.defaultProps = {
  node: {
    name: "",
    url: ""
  }
};

export default ExternalLinkNode;
