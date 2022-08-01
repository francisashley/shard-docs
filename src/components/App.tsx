import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import withRouter from '../hoc/withRouter'
import AppMain from './AppMain'
import AppSidebar from './AppSidebar'
import dataTools from '../utils/dataTools'
import useWindowSize from '../hooks/useWindowSize'
import { DataPropType } from '../prop-types'

import '../assets/sanitize.css'
import './App.scss'

export type props = {
  title?: string
  data: inputData
  basePath?: string
  hideBuiltWithShardDocs?: boolean
  routerType?: 'hash' | 'browser'
  currentPath?: string
}

const App = (props: props) => {
  let initialData = dataTools.parse(props.data, props.basePath)
  initialData = dataTools.updateState(initialData, props.basePath, props.currentPath)
  const pages = dataTools.getPages(initialData)
  const initialCurrentPage = dataTools.getCurrentPage(pages, props.currentPath)
  const initialPrevPage = dataTools.getPrevPage(pages, props.currentPath)
  const initialNextPage = dataTools.getNextPage(pages, props.currentPath)

  const [data, setData] = useState(initialData)
  const [currentPath, setCurrentPath] = useState(props.currentPath)
  const [currentPage, setCurrentPage] = useState(initialCurrentPage as page | null)
  const [prevPage, setPrevPage] = useState(initialPrevPage as page | null)
  const [nextPage, setNextPage] = useState(initialNextPage as page | null)
  const windowSize = useWindowSize()

  const [device, setDevice] = useState(
    (windowSize.width || 0) > 1200 ? 'desktop' : ('mobile' as 'desktop' | 'mobile')
  )

  // on route change
  useEffect(() => {
    const prevPath = currentPath

    if (props.currentPath !== prevPath) {
      setCurrentPath(props.currentPath)
      setData(dataTools.updateState(data, props.basePath, props.currentPath))
      setCurrentPage(dataTools.getCurrentPage(pages, props.currentPath || ''))
      setPrevPage(dataTools.getPrevPage(pages, props.currentPath || ''))
      setNextPage(dataTools.getNextPage(pages, props.currentPath || ''))
      window.scrollTo(0, 0)
    }
  }, [props.currentPath])

  // on window resize
  useEffect(() => {
    setDevice((windowSize.width || 0) > 1200 ? 'desktop' : 'mobile')
  }, [windowSize.width])

  const onToggleMenu = (path: string) => {
    setData(dataTools.toggleMenu(data, path))
  }

  return (
    <div className="App">
      <AppSidebar
        title={props.title}
        basePath={props.basePath}
        items={data as item[]}
        hideBuiltWithShardDocs={props.hideBuiltWithShardDocs}
        onToggleMenu={onToggleMenu}
        device={device}
      />
      <AppMain
        page={currentPage}
        prevPage={prevPage as paginationPage}
        nextPage={nextPage as paginationPage}
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
