import React from "react";
import ExternalIcon from "./icons/LinkExternal";
import { LinkPropType } from "../prop-types";

type ExternalLinkNodeProps = {
  node: linkItem;
}

const ExternalLinkNode = (props: ExternalLinkNodeProps) => (
  <li className="shard-docs-menu-external">
    <a href={props.node.url} target="_blank" style={{ paddingLeft: props.node.depth * 15 + "px" }}>
      <ExternalIcon />
      {props.node.name}
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
