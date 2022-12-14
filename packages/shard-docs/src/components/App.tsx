import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import withRouter from '../hoc/withRouter'
import AppHeader from './AppHeader'
import AppMain from './AppMain'
import AppSidebar from './AppSidebar'
import useData from '../hooks/useData'
import usePagination from '../hooks/usePagination'
import useDevice from '../hooks/useDevice'
import { DataPropType } from '../prop-types'

import '../assets/sanitize.css'
import './App.scss'

export type props = {
  title?: string
  data?: inputData
  basePath?: string
  hideBuiltWithShardDocs?: boolean
  routerType?: 'hash' | 'browser'
  currentPath?: string
}

const App = (props: props) => {
  const [data, dataActions] = useData(props.data || [], props.basePath, props.currentPath)
  const [pages, pageActions] = usePagination(data, props.currentPath, props.basePath)
  const [device] = useDevice()
  const [showMobileMobile, setMobileMenu] = useState(false)

  // on route change
  useEffect(() => {
    dataActions.setCurrentPath(props.currentPath)
    pageActions.setCurrentPath(props.currentPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [props.currentPath])

  return (
    <div className="App">
      <AppHeader
        title={props.title}
        basePath={props.basePath}
        onToggleMenu={() => setMobileMenu(!showMobileMobile)}
      />
      <div className="App__inner">
        <AppSidebar
          title={props.title}
          basePath={props.basePath}
          items={data as item[]}
          showMobileMenu={showMobileMobile}
          onToggleMenu={dataActions.toggleMenu}
          device={device}
        />
        <AppMain
          page={pages.current}
          prevPage={pages.prev as paginationPage}
          nextPage={pages.next as paginationPage}
          hideBuiltWithShardDocs={props.hideBuiltWithShardDocs}
        />
      </div>
    </div>
  )
}

App.propTypes = {
  title: PropTypes.string,
  data: DataPropType,
  basePath: PropTypes.string,
  hideBuiltWithShardDocs: PropTypes.bool,
  routerType: PropTypes.string,
  currentPath: PropTypes.string,
}

App.defaultProps = {
  title: '',
  data: [],
  basePath: '/',
  hideBuiltWithShardDocs: false,
  routerType: 'hash',
  currentPath: '',
}

export default withRouter<props>(App)
