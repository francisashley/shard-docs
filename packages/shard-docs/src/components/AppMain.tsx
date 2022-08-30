import React from 'react'
import MainPagination from './MainPagination'
import MainContent from './MainContent'
import BuiltWithShardDocs from './BuiltWithShardDocs'
import { PagePropType } from '../prop-types'
import './AppMain.scss'
import PropTypes from 'prop-types'

type props = {
  page?: page | null
  prevPage?: paginationPage
  nextPage?: paginationPage
  hideBuiltWithShardDocs?: boolean
}

const AppMain = (props: props) => {
  const showPagination = Boolean(props.prevPage || props.nextPage)

  const Pagination = showPagination && (
    <MainPagination prevPage={props.prevPage} nextPage={props.nextPage} />
  )

  return (
    <main className="AppMain">
      <MainContent title={props.page?.name} content={props.page?.content} />
      {Pagination}
      {!props.hideBuiltWithShardDocs && <BuiltWithShardDocs />}
    </main>
  )
}

AppMain.propTypes = {
  prevPage: PagePropType,
  nextPage: PagePropType,
  page: PagePropType,
  hideBuiltWithShardDocs: PropTypes.bool,
}
AppMain.defaultProps = {
  prevPage: null,
  nextPage: null,
  page: null,
  hideBuiltWithShardDocs: false,
}

export default AppMain
