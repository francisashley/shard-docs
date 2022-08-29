import React, { HTMLAttributes } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import ExternalLinkIcon from './icons/ExternalLinkIcon'
import './AppNavMenuListButton.scss'

type props = {
  name: string
  url: string
  className: string
  isActive: boolean
  after: React.ReactElement
  'aria-expanded'?: boolean | null
  onClick: (event: React.MouseEvent<HTMLElement>) => unknown
}

const isInternalLink = (text: string) => new RegExp('^/.+').test(text)
const isExternalLink = (text: string) => new RegExp('^https?://.+').test(text)

const AppNavMenuListButton = (props: props) => {
  if (isExternalLink(props.url)) {
    return (
      <a
        href={props.url}
        target="_blank"
        className={classnames(
          'AppNavMenuListButton AppNavMenuListButton--external',
          { 'AppNavMenuListButton AppNavMenuListButton--active': props.isActive },
          props.className
        )}
        onClick={props.onClick}
        aria-label={'Open external link: ' + props.name}
      >
        {props.name}
        <ExternalLinkIcon className="AppNavMenuListButton__external-icon" />
        {props.after}
      </a>
    )
  } else if (isInternalLink(props.url)) {
    return (
      <NavLink
        to={props.url}
        className={classnames(
          'AppNavMenuListButton AppNavMenuListButton--internal',
          { 'AppNavMenuListButton AppNavMenuListButton--active': props.isActive },
          props.className
        )}
        onClick={props.onClick}
        aria-label={'Navigate to page: ' + props.name}
      >
        {props.name}
        {props.after}
      </NavLink>
    )
  } else {
    const attrs = {} as HTMLAttributes<HTMLButtonElement>
    if (typeof props['aria-expanded'] === 'boolean') {
      attrs['aria-expanded'] = props['aria-expanded']
    }
    return (
      <button
        className={classnames(
          'AppNavMenuListButton AppNavMenuListButton--toggle',
          { 'AppNavMenuListButton AppNavMenuListButton--active': props.isActive },
          props.className
        )}
        onClick={props.onClick}
        {...attrs}
      >
        {props.name}
        {props.after}
      </button>
    )
  }
}

AppNavMenuListButton.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
  'aria-expanded': PropTypes.bool,
  isActive: PropTypes.bool,
  after: PropTypes.node,
  onClick: PropTypes.func,
}

AppNavMenuListButton.defaultProps = {
  name: '',
  url: '',
  className: '',
  'aria-expanded': null,
  isActive: false,
  after: null,
  onClick: () => {},
}

export default AppNavMenuListButton
