import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AppHeader from '@/components/AppHeader'
import AppNav from '@/components/AppNav'
import BuiltWithShardDocs from '@/components/BuiltWithShardDocs'
import { ItemsPropType } from '@/prop-types'
import './AppSidebar.scss'

type props = {
  title?: string
  basePath?: string
  items: item[]
  hideBuiltWithShardDocs: boolean
  device: 'desktop' | 'mobile'
  onToggleMenu: (path: string) => void
}

const AppSidebar = (props: props) => {
  const [showMenuOnMobile, setShowMenuOnMobile] = useState(false)
  const showBuiltWithShardDocs = !props.hideBuiltWithShardDocs
  const isExpanded = props.device !== 'mobile' || showMenuOnMobile
  const onToggleMenu = () => setShowMenuOnMobile(!showMenuOnMobile)
  const onNavigate = () => setShowMenuOnMobile(false)

  return (
    <aside className="AppSidebar">
      <AppHeader
        title={props.title}
        basePath={props.basePath}
        isExpanded={isExpanded}
        onToggleMenu={onToggleMenu}
      />
      <AppNav
        items={props.items}
        showOnMobile={showMenuOnMobile}
        onNavigate={onNavigate}
        onToggleMenu={props.onToggleMenu}
        device={props.device}
      />
      {showBuiltWithShardDocs && <BuiltWithShardDocs />}
    </aside>
  )
}

AppSidebar.propTypes = {
  title: PropTypes.string,
  basePath: PropTypes.string,
  items: ItemsPropType,
  hideBuiltWithShardDocs: PropTypes.bool,
  device: PropTypes.oneOf(['desktop', 'mobile']),
  onToggleMenu: PropTypes.func,
}

AppSidebar.defaultProps = {
  app: {},
  title: '',
  items: [],
  hideBuiltWithShardDocs: false,
  device: 'mobile',
  onToggleMenu: () => {},
}

export default AppSidebar
