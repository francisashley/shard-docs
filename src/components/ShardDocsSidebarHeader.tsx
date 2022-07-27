import React from "react";
import PropTypes from "prop-types";
import ShardDocsSidebarHeaderTitle from "./ShardDocsSidebarHeaderTitle";
import ShardDocsSidebarHeaderToggle from "./ShardDocsSidebarHeaderToggle";
import "./ShardDocsSidebarHeader.scss";

type props = {
  title:string,
  basePath:string,
  onToggleMenu: () => void;
}

const ShardDocsSidebarHeader = ({ title, basePath, onToggleMenu, ...props }: props) => {
  return (
    <header className="shard-docs-header" {...props}>
      {title && <ShardDocsSidebarHeaderTitle title={title} path={basePath} />}
      <ShardDocsSidebarHeaderToggle onClick={onToggleMenu} />
    </header>
  );
};

ShardDocsSidebarHeader.propTypes = {
  title: PropTypes.string,
  basePath: PropTypes.string,
  onToggleMenu: PropTypes.func
};

ShardDocsSidebarHeader.defaultProps = {
  title: "",
  basePath: "/",
  onToggleMenu: () => {}
};

export default ShardDocsSidebarHeader;
