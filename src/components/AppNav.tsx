import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { ItemsPropType } from '../prop-types'
import './AppNav.scss'

import AppNavMenuList from './AppNavMenuList'

type props = {
  showOnMobile: boolean
  items: item[]
  onNavigate: () => void
  onToggleMenu: (path: string) => void
}

const AppNav = (props: props) => {
  return (
    <nav
      className={classnames('AppNav', props.showOnMobile && 'AppNav--show')}
      aria-label="Main Menu"
    >
      <AppNavMenuList items={props.items} isRoot={true} onToggleMenu={props.onToggleMenu} />
    </nav>
  )
}

AppNav.propTypes = {
  items: ItemsPropType,
  showOnMobile: PropTypes.bool,
  onNavigate: PropTypes.func,
  onToggleMenu: PropTypes.func,
}

AppNav.defaultProps = {
  items: [],
  showOnMobile: false,
  onNavigate: () => {},
  onToggleMenu: () => {},
}

export default AppNav
