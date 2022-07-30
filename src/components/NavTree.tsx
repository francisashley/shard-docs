import React from 'react'
import PropTypes from 'prop-types'
import NavPage from './NavPage'
import NavLink from './NavLink'
import NavCategory from './NavCategory'
import { ItemsPropType } from '../prop-types'

type props = {
  items: data
  onNavigate: () => void
}

const NavTree = (props: props) => {
  return (
    <>
      {props.items.map((item, i) => {
        if (item.type === 'page') {
          return <NavPage key={i} item={item} onNavigate={props.onNavigate} />
        } else if (item.type === 'link') {
          return <NavLink key={i} item={item} />
        } else if (item.type === 'category') {
          return <NavCategory key={i} item={item} onNavigate={props.onNavigate} />
        }
      })}
    </>
  )
}

NavTree.propTypes = {
  items: ItemsPropType,
  onNavigate: PropTypes.func,
}

NavTree.defaultProps = {
  items: [],
  onNavigate: () => {},
}

export default NavTree
