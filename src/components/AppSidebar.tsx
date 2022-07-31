import React from 'react'
import PropTypes from 'prop-types'
import AppHeader from './AppHeader'
import AppNav from './AppNav'
import BuiltWithShardDocs from './BuiltWithShardDocs'
import { ItemsPropType } from '../prop-types'
import './AppSidebar.scss'

type props = {
  title?: string
  basePath?: string
  items: item[]
  hideBuiltWithShardDocs: boolean
  onToggleMenu: (path: string) => void
}

type state = {
  showMenuOnMobile: boolean
}

class AppSidebar extends React.Component<props, state> {
  static propTypes = {
    title: PropTypes.string,
    basePath: PropTypes.string,
    items: ItemsPropType,
    hideBuiltWithShardDocs: PropTypes.bool,
    onToggleMenu: PropTypes.func,
  }

  static defaultProps = {
    app: {},
    title: '',
    items: [],
    hideBuiltWithShardDocs: false,
    onToggleMenu: () => {},
  }

  state = {
    showMenuOnMobile: false,
  }

  render() {
    const props = this.props
    const showBuiltWithShardDocs = !props.hideBuiltWithShardDocs
    return (
      <aside className="AppSidebar">
        <AppHeader
          title={props.title}
          basePath={props.basePath}
          onToggleMenu={() => this.setState({ showMenuOnMobile: !this.state.showMenuOnMobile })}
        />
        <AppNav
          items={props.items}
          showOnMobile={this.state.showMenuOnMobile}
          onNavigate={() => this.setState({ showMenuOnMobile: false })}
          onToggleMenu={props.onToggleMenu}
        />
        {showBuiltWithShardDocs && <BuiltWithShardDocs />}
      </aside>
    )
  }
}

export default AppSidebar
