import React from 'react'
import MainPagination from './MainPagination'
import MainContent from './MainContent'
import { PagePropType } from '../prop-types'
import './AppMain.scss'

type props = {
  page?: page | null
  prevPage?: paginationPage
  nextPage?: paginationPage
}

const AppMain = (props: props) => {
  const showPagination = Boolean(props.prevPage || props.nextPage)

  const Pagination = showPagination && (
    <MainPagination prevPage={props.prevPage} nextPage={props.nextPage} />
  )

  return (
    <main className="sd-AppMain">
      <MainContent breadcrumbs={props.page?.breadcrumbs} content={props.page?.content} />
      {Pagination}
    </main>
  )
}

AppMain.propTypes = {
  prevPage: PagePropType,
  nextPage: PagePropType,
  page: PagePropType,
}
AppMain.defaultProps = {
  prevPage: null,
  nextPage: null,
  page: null,
}

export default AppMain
