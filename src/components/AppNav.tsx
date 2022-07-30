import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { ItemsPropType } from "../prop-types";
import NavSection from "./NavSection";
import "./AppNav.scss";

type props = {
  showOnMobile: boolean,
  items: category[],
  onNavigate: () => void,
}

const AppNav = (props: props) => {
  return (
    <div className={classnames("sd-AppNav", props.showOnMobile && 'sd-AppNav--show')}>
      {props.items.map((item, i) => (
        <NavSection key={i} index={i} item={item} onNavigate={props.onNavigate} />
      ))}
    </div>
  );
};

AppNav.propTypes = {
  items: ItemsPropType,
  showOnMobile: PropTypes.bool,
  onNavigate: PropTypes.func
};

AppNav.defaultProps = {
  items: [],
  showOnMobile: false,
  onNavigate: () => {}
};

export default AppNav;