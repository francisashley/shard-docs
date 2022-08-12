import React from 'react'
import { NavLink } from 'react-router-dom'
import { PagePropType } from '@/prop-types'
import './MainPagination.scss'

type MainPaginationProps = {
  prevPage?: paginationPage
  nextPage?: paginationPage
}

const MainPagination = (props: MainPaginationProps) => {
  return (
    <footer className="MainPagination" aria-label="Pagination footer">
      {props.prevPage && (
        <NavLink className="MainPagination__btn MainPagination__btn--prev" to={props.prevPage.path}>
          ⟵ {props.prevPage.name}
        </NavLink>
      )}
      {props.nextPage && (
        <NavLink className="MainPagination__btn MainPagination__btn--next" to={props.nextPage.path}>
          {props.nextPage.name} ⟶
        </NavLink>
      )}
    </footer>
  )
}

MainPagination.propTypes = {
  prevPage: PagePropType,
  nextPage: PagePropType,
}

MainPagination.defaultProps = {
  prevPage: null,
  nextPage: null,
}

export default MainPagination
