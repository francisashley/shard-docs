import React from "react";
import HamburgerIcon from "./icons/HamburgerIcon";
import "./ShardDocsSidebarHeaderToggle.scss";

type props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ShardDocsSidebarHeaderToggle = ({ onClick, ...props}: props) => {
  return (
    <button className="shard-docs-header-toggle" onClick={onClick} {...props}>
      <HamburgerIcon />
    </button>
  );
};

ShardDocsSidebarHeaderToggle.propTypes = {};

ShardDocsSidebarHeaderToggle.defaultProps = {};

export default ShardDocsSidebarHeaderToggle;
