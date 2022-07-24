import React from "react";
import PropTypes from "prop-types";
import ExternalIcon from "./icons/LinkExternal";
import { ExternalLinkPropType } from "../prop-types";

/**
 * ExternalLinkNode
 */

const ExternalLinkNode = ({ node }) => (
  <li className="shard-docs-menu-external">
    <a href={node.link} target="_blank" style={{ paddingLeft: node.depth * 15 + "px" }}>
      <ExternalIcon />
      {node.name}
    </a>
  </li>
);

ExternalLinkNode.propTypes = {
  node: ExternalLinkPropType
};

ExternalLinkNode.defaultProps = {
  node: {
    name: "",
    link: ""
  }
};

export default ExternalLinkNode;
