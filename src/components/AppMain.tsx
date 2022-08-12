import React from 'react'
import MainPagination from '@/components/MainPagination'
import MainContent from '@/components/MainContent'
import { PagePropType } from '@/prop-types'
import '@/components/AppMain.scss'

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
    <main className="AppMain">
      <MainContent title={props.page?.name} content={props.page?.content} />
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
