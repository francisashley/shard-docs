import React from 'react'
import PropTypes from 'prop-types'
import { CategoryPropType } from '../prop-types'
import ShardDocsSidebarMenuTree from './NavTree'
import sessionDB from '../utils/sessionDB'
import classnames from 'classnames'
import NavSectionHeader from './NavSectionHeader'
import './NavSection.scss'

type props = {
  index: number
  item: category
  onNavigate: () => void
}

type state = {
  expanded: boolean
}

class NavSection extends React.Component<props, state> {
  static propTypes = {
    index: PropTypes.number,
    item: CategoryPropType,
    onNavigate: PropTypes.func,
  }

  static defaultProps = {
    index: 0,
    item: {},
    onNavigate: () => {},
  }

  state = {
    expanded: sessionDB.get(this.sessionId, this.props.index === 0 ? true : false),
  }

  get sessionId() {
    return 'sd-nav-cat-expanded' + (this.props.item.path || '')
  }

  toggle = () => {
    sessionDB.set(this.sessionId, !this.state.expanded)
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const props = this.props
    const collapsible = Boolean(props.item.name)
    const expanded = this.state.expanded

    const className = classnames(
      'sd-NavSection',
      collapsible && 'collapsible',
      expanded && 'expanded'
    )

    // Ignore `expanded` value if section is discrete.
    const showMenu = collapsible ? expanded : true

    return (
      <section className={className}>
        {collapsible && (
          <NavSectionHeader
            title={props.item.name || ''}
            expanded={expanded}
            onToggle={this.toggle}
          />
        )}
        {showMenu && (
          <ul>
            <ShardDocsSidebarMenuTree items={props.item.items} onNavigate={props.onNavigate} />
          </ul>
        )}
      </section>
    )
  }
}

export default NavSection
