import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { DocumentItemPropType } from "../prop-types";
import FileIcon from "./icons/FileIcon";
import "./NavDocument.scss";

type props = {
  item: documentItem;
  onNavigate: () => void;
}

const NavDocument = (props: props) => {
  return (
    <li className="sd-NavDocument">
      <NavLink
        style={{ paddingLeft: props.item.depth * 15 + "px" }}
        className={classnames('sd-NavDocument__link', props.item.isActive && "sd-NavDocument__link--active")}
        onClick={e => (props.item.isEmpty ? e.preventDefault() : props.onNavigate())}
        to={props.item.path}
        exact
      >
        <FileIcon className='sd-NavDocument__icon'/>
        {props.item.name}
      </NavLink>
    </li>
  );
};

NavDocument.propTypes = {
  item: DocumentItemPropType,
  onNavigate: PropTypes.func
};

NavDocument.defaultProps = {
  item: {},
  onNavigate: () => {}
};

export default NavDocument;
