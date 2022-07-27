import React from "react";
import HamburgerIcon from "./icons/HamburgerIcon";
import "./AppHeaderToggle.scss";

type props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const AppHeaderToggle = ({ onClick, ...props}: props) => {
  return (
    <button className="sd-AppHeaderToggle" onClick={onClick} {...props}>
      <HamburgerIcon />
    </button>
  );
};

AppHeaderToggle.propTypes = {};

AppHeaderToggle.defaultProps = {};

export default AppHeaderToggle;
