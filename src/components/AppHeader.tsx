import React from "react";
import PropTypes from "prop-types";
import AppHeaderTitle from "./AppHeaderTitle";
import HamburgerIcon from "./icons/HamburgerIcon";
import "./AppHeader.scss";

type props = {
  title: string,
  basePath: string,
  onToggleMenu: () => void;
}

const AppHeader = ({ title, basePath, onToggleMenu, ...props }: props) => {
  return (
    <header className="sd-AppHeader" {...props}>
      {title && <AppHeaderTitle title={title} path={basePath} />}
      <button className="sd-AppHeader__toggle-btn" onClick={onToggleMenu} {...props}>
        <HamburgerIcon className="sd-AppHeader__toggle-icon" />
      </button>
    </header>
  );
};

AppHeader.propTypes = {
  title: PropTypes.string,
  basePath: PropTypes.string,
  onToggleMenu: PropTypes.func
};

AppHeader.defaultProps = {
  title: "",
  basePath: "/",
  onToggleMenu: () => {}
};

export default AppHeader;
