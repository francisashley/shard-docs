import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import { BreadcrumbPropType } from '../prop-types'
import './MainBreadcrumbs.scss'

type props = {
  breadcrumbs: breadcrumb[]
}

const MainBreadcrumbs = ({ breadcrumbs }: props) => (
  <ul className="sd-MainBreadcrumbs" role="navigation">
    {breadcrumbs.map(({ name, path, isActive }, i) => {
      return (
        <li className="sd-MainBreadcrumbs__item" key={i}>
          <NavLink
            className={classnames(
              'sd-MainBreadcrumbs__item-link',
              isActive && 'sd-MainBreadcrumbs__item-link--active'
            )}
            isActive={() => false}
            to={path}
          >
            {name}
          </NavLink>
        </li>
      )
    })}
  </ul>
)

MainBreadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbPropType).isRequired,
}

MainBreadcrumbs.defaultProps = {
  breadcrumbs: [],
}

export default MainBreadcrumbs
