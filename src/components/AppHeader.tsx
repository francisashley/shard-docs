import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import HamburgerIcon from './icons/HamburgerIcon'
import './AppHeader.scss'

type props = {
  title: string
  basePath: string
  onToggleMenu: () => void
}

const AppHeader = ({ title, basePath, onToggleMenu, ...props }: props) => {
  return (
    <header className="sd-AppHeader" {...props}>
      <NavLink className="sd-AppHeader__title-link" to={basePath}>
        <h2 className="sd-AppHeader__title" title={title} aria-label="Home">
          {title}
        </h2>
      </NavLink>
      <button className="sd-AppHeader__toggle-btn" onClick={onToggleMenu} {...props}>
        <HamburgerIcon className="sd-AppHeader__toggle-icon" />
      </button>
    </header>
  )
}

AppHeader.propTypes = {
  title: PropTypes.string,
  basePath: PropTypes.string,
  onToggleMenu: PropTypes.func,
}

AppHeader.defaultProps = {
  title: 'Docs title',
  basePath: '/',
  onToggleMenu: () => {},
}

export default AppHeader
