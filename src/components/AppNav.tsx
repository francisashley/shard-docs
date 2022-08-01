import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { ItemsPropType } from '../prop-types'
import './AppNav.scss'

import AppNavMenuList from './AppNavMenuList'

type props = {
  showOnMobile: boolean
  items: item[]
  device: 'desktop' | 'mobile'
  onNavigate: () => void
  onToggleMenu: (path: string) => void
}

const AppNav = (props: props) => {
  const isHidden = props.device === 'mobile' && !props.showOnMobile ? true : false
  return (
    <nav
      className={classnames('AppNav', props.showOnMobile && 'AppNav--show')}
      aria-label="Main Menu"
      hidden={isHidden}
      aria-hidden={isHidden}
    >
      <AppNavMenuList
        items={props.items}
        isRoot={true}
        onToggleMenu={props.onToggleMenu}
        onNavigate={props.onNavigate}
      />
    </nav>
  )
}

AppNav.propTypes = {
  items: ItemsPropType,
  showOnMobile: PropTypes.bool,
  device: PropTypes.oneOf(['mobile', 'desktop']),
  onNavigate: PropTypes.func,
  onToggleMenu: PropTypes.func,
}

AppNav.defaultProps = {
  items: [],
  showOnMobile: false,
  device: 'mobile',
  onNavigate: () => {},
  onToggleMenu: () => {},
}

export default AppNav
