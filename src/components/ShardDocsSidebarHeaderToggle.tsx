import React from "react";
import MenuIcon from "./icons/MenuIcon";
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
