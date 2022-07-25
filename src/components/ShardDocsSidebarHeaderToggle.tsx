import React from "react";
import PropTypes from "prop-types";
import MenuIcon from "boxicons/svg/regular/bx-menu.svg";
import "./ShardDocsSidebarHeaderToggle.scss";

type HeaderToggleProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const HeaderToggle = ({ onClick, ...props}: HeaderToggleProps) => {
  return (
    <button className="shard-docs-header-toggle" onClick={onClick} {...props}>
      <MenuIcon />
    </button>
  );
};

HeaderToggle.propTypes = {};

HeaderToggle.defaultProps = {};

export default HeaderToggle;
