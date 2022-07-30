import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import { PagePropType } from '../prop-types'
import FileIcon from './icons/FileIcon'
import './NavPage.scss'

type props = {
  item: page
  onNavigate: () => void
}

const NavPage = (props: props) => {
  return (
    <li className="NavPage">
      <NavLink
        style={{ paddingLeft: props.item.depth * 15 + 'px' }}
        className={classnames('NavPage__link', props.item.isActive && 'NavPage__link--active')}
        onClick={(e) => (props.item.isEmpty ? e.preventDefault() : props.onNavigate())}
        to={props.item.path}
        exact
      >
        <FileIcon className="NavPage__icon" />
        {props.item.name}
      </NavLink>
    </li>
  )
}

NavPage.propTypes = {
  item: PagePropType,
  onNavigate: PropTypes.func,
}

NavPage.defaultProps = {
  item: {},
  onNavigate: () => {},
}

export default NavPage
