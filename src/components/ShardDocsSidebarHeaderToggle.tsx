import React from "react";
import MenuIcon from "./icons/MenuIcon";
import "./ShardDocsSidebarHeaderToggle.scss";

type props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ShardDocsSidebarHeaderToggle = ({ onClick, ...props}: props) => {
  return (
    <button className="shard-docs-header-toggle" onClick={onClick} {...props}>
      <MenuIcon />
    </button>
  );
};

ShardDocsSidebarHeaderToggle.propTypes = {};

ShardDocsSidebarHeaderToggle.defaultProps = {};

export default ShardDocsSidebarHeaderToggle;
