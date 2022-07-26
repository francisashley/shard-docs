import React from "react";
import ExternalIcon from "./icons/LinkExternal";
import { LinkItemPropType } from "../prop-types";

type LinkNodeProps = {
  node: linkItem;
}

const LinkNode = (props: LinkNodeProps) => {
  const openInNewTab = props.node.external === true;
  return (
    <li className="shard-docs-menu-external">
      <a href={props.node.url} target={openInNewTab ? "_blank" : "_self"} style={{ paddingLeft: props.node.depth * 15 + "px" }}>
        <ExternalIcon />
        {props.node.name}
      </a>
    </li>
  )
};

LinkNode.propTypes = {
  node: LinkItemPropType
};

LinkNode.defaultProps = {
  node: {
    name: "",
    url: ""
  }
};

export default LinkNode;
