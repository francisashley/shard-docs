import React from "react";
import ExternalLinkIcon from "./icons/ExternalLinkIcon";
import { LinkItemPropType } from "../prop-types";

type props = {
  item: linkItem;
}

const ShardDocsSidebarMenuLink = (props: props) => {
  const openInNewTab = props.item.external === true;
  return (
    <li className="shard-docs-menu-external">
      <a href={props.item.url} target={openInNewTab ? "_blank" : "_self"} style={{ paddingLeft: props.item.depth * 15 + "px" }}>
        <ExternalLinkIcon />
        {props.item.name}
      </a>
    </li>
  )
};

ShardDocsSidebarMenuLink.propTypes = {
  item: LinkItemPropType
};

ShardDocsSidebarMenuLink.defaultProps = {
  item: {
    name: "",
    url: ""
  }
};

export default ShardDocsSidebarMenuLink;
