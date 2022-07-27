import React from "react";
import ExternalLinkIcon from "./icons/ExternalLinkIcon";
import { LinkItemPropType } from "../prop-types";

type props = {
  item: linkItem;
}

const NavLink = (props: props) => {
  const openInNewTab = props.item.external === true;
  return (
    <li className="sd-NavLink">
      <a href={props.item.url} target={openInNewTab ? "_blank" : "_self"} style={{ paddingLeft: props.item.depth * 15 + "px" }}>
        <ExternalLinkIcon />
        {props.item.name}
      </a>
    </li>
  )
};

NavLink.propTypes = {
  item: LinkItemPropType
};

NavLink.defaultProps = {
  item: {
    name: "",
    url: ""
  }
};

export default NavLink;
