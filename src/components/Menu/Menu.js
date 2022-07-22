import React from "react";
import PropTypes from "prop-types";
import { TreePropType } from "../../prop-types";
import MenuTree from "../MenuTree";
import MenuSection from "../MenuSection";
import "./Menu.scss";

/**
 * Menu
 */

const Menu = props => {
  return (
    <div className="shard-docs-menu" data-show-on-mobile={props.showOnMobile}>
      {props.tree.map((node, i) => (
        <MenuSection key={i} index={i} node={node} onNavigate={props.onNavigate} />
      ))}
    </div>
  );
};

Menu.propTypes = {
  tree: TreePropType,
  showOnMobile: PropTypes.bool,
  onNavigate: PropTypes.func
};

Menu.defaultProps = {
  tree: [],
  showOnMobile: false,
  onNavigate: () => {}
};

export default Menu;
