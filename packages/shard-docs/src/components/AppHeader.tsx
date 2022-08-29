import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import HamburgerIcon from './icons/HamburgerIcon'
import './AppHeader.scss'

type props = {
  title: string
  basePath: string
  isExpanded: boolean
  onToggleMenu: () => void
}

const AppHeader = ({ title, basePath, onToggleMenu, isExpanded, ...props }: props) => {
  return (
    <header className="AppHeader" {...props}>
      <NavLink className="AppHeader__title" to={basePath} area-label="Home" title={title}>
        {title}
      </NavLink>
      <button
        className="AppHeader__toggle-btn"
        onClick={onToggleMenu}
        aria-expanded={isExpanded}
        aria-haspopup="menu"
        aria-label={isExpanded ? 'Close main menu' : 'Open main menu'}
        {...props}
      >
        <HamburgerIcon className="AppHeader__toggle-icon" />
      </button>
    </header>
  )
}

AppHeader.propTypes = {
  title: PropTypes.string,
  basePath: PropTypes.string,
  isExpanded: PropTypes.bool,
  onToggleMenu: PropTypes.func,
}

AppHeader.defaultProps = {
  title: 'Docs title',
  basePath: '/',
  isExpanded: false,
  onToggleMenu: () => {},
}

export default AppHeader
