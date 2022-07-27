import React from "react";
import PropTypes from "prop-types";
import { CategoryItemPropType } from "../prop-types";
import NavTree from "./NavTree";
import BaseLink from "@fa-repo/base-react/dist/link";
import TriangleArrowDown from "./icons/TriangleArrowDown";
import TriangleArrowRight from "./icons/TriangleArrowRight";
import sessionDB from "../utils/sessionDB";
import "./NavCategory.scss";

type props = {
  item: categoryItem,
  onNavigate: () => void
}
type state = {
  sessionId: string,
  expanded: boolean
}

class NavCategory extends React.Component<props, state> {
  static propTypes = {
    item: CategoryItemPropType,
    onNavigate: PropTypes.func
  };
  
  static defaultProps = {
    item: {},
    onNavigate: () => {}
  };

  state = {
    sessionId: "sd-nav-cat-expanded" + this.props.item.path,
    expanded: true
  };

  componentDidMount() {
    this.setState({
      expanded: sessionDB.get(this.state.sessionId, true)
    });
  }

  toggleCategory = () => {
    sessionDB.set(this.state.sessionId, !this.state.expanded);

    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { item, onNavigate } = this.props;

    return (
      <ul className="sd-NavCategory">
        {item.name && (
          <li className="sd-NavCategory__header">
            <BaseLink
             className="sd-NavCategory__header-link"
              style={{ paddingLeft: item.depth * 15 + "px" }}
              onClick={this.toggleCategory}
              disabled={item.isEmpty}
            >
              {this.state.expanded ? <TriangleArrowDown className="sd-NavCategory__header-icon" /> : <TriangleArrowRight className="sd-NavCategory__header-icon" />}
              {item.name}
            </BaseLink>
          </li>
        )}
        {this.state.expanded && <NavTree items={item.items} onNavigate={onNavigate} />}
      </ul>
    );
  }
}

export default NavCategory;
