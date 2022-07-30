import React from 'react'
import ExternalLinkIcon from './icons/ExternalLinkIcon'
import { LinkPropType } from '../prop-types'
import './NavLink.scss'

type props = {
  item: link
}

const NavLink = (props: props) => {
  const openInNewTab = props.item.isExternal === true
  return (
    <li className="NavLink">
      <a
        className="NavLink__link"
        href={props.item.url}
        target={openInNewTab ? '_blank' : '_self'}
        style={{ paddingLeft: props.item.depth * 15 + 'px' }}
      >
        <ExternalLinkIcon className="NavLink__icon" />
        {props.item.name}
      </a>
    </li>
  )
}

NavLink.propTypes = {
  item: LinkPropType,
}

NavLink.defaultProps = {
  item: {
    name: '',
    url: '',
  },
}

export default NavLink
