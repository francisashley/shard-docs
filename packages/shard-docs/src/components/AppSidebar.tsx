import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppNav from './AppNav'
import { ItemsPropType } from '../prop-types'
import './AppSidebar.scss'
import classNames from 'classnames'

type props = {
  title?: string
  basePath?: string
  items: item[]
  device: 'desktop' | 'mobile'
  showMobileMenu: boolean
  onToggleMenu: (path: string) => void
}

const AppSidebar = (props: props) => {
  const [showMenuOnMobile, setShowMenuOnMobile] = useState(false)
  const onNavigate = () => setShowMenuOnMobile(false)

  useEffect(() => setShowMenuOnMobile(props.showMobileMenu), [props.showMobileMenu])

  return (
    <aside className={classNames('AppSidebar', showMenuOnMobile && 'AppSidebar--show')}>
      <div className="AppSidebar__inner">
        <AppNav
          items={props.items}
          showOnMobile={showMenuOnMobile}
          onNavigate={onNavigate}
          onToggleMenu={props.onToggleMenu}
          device={props.device}
        />
      </div>
      <div className="AppSidebar__backdrop" />
    </aside>
  )
}

AppSidebar.propTypes = {
  basePath: PropTypes.string,
  items: ItemsPropType,
  device: PropTypes.oneOf(['desktop', 'mobile']),
  showMobileMenu: PropTypes.bool,
  onToggleMenu: PropTypes.func,
}

AppSidebar.defaultProps = {
  app: {},
  items: [],
  device: 'mobile',
  showMobileMenu: false,
  onToggleMenu: () => {},
}

export default AppSidebar
