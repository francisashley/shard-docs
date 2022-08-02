import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import withRouter from '../hoc/withRouter'
import AppMain from './AppMain'
import AppSidebar from './AppSidebar'
import dataTools from '../utils/dataTools'
import useWindowSize from '../hooks/useWindowSize'
import useData from '../hooks/useData'
import usePagination from '../hooks/usePagination'
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
  const [pages, pageActions] = usePagination(data, props.currentPath)
  const windowSize = useWindowSize()

  const [device, setDevice] = useState(
    (windowSize.width || 0) > 1200 ? 'desktop' : ('mobile' as 'desktop' | 'mobile')
  )

  // on route change
  useEffect(() => {
    dataActions.setCurrentPath(props.currentPath || '')
    pageActions.setCurrentPath(props.currentPath || '')
    window.scrollTo(0, 0)
  }, [props.currentPath])

  // on window resize
  useEffect(() => {
    setDevice((windowSize.width || 0) > 1200 ? 'desktop' : 'mobile')
  }, [windowSize.width])

  return (
    <div className="App">
      <AppSidebar
        title={props.title}
        basePath={props.basePath}
        items={data as item[]}
        hideBuiltWithShardDocs={props.hideBuiltWithShardDocs}
        onToggleMenu={dataActions.toggleMenu}
        device={device}
      />
      <AppMain
        page={pages.current}
        prevPage={pages.prev as paginationPage}
        nextPage={pages.next as paginationPage}
      />
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
