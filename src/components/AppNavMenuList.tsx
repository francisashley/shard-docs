import React from 'react'
import classnames from 'classnames'
import { ItemsPropType } from '../prop-types'
import PropTypes from 'prop-types'
import AppNavMenuListButton from './AppNavMenuListButton'
import AppNavSubMenuList from './AppNavSubMenuList'
import './AppNavMenuList.scss'
import { useLocation } from 'react-router-dom'
import dataTools from '../utils/dataTools'

type props = {
  items: data
  isRoot: boolean
  className: string
  onToggleMenu: (event: React.MouseEvent<HTMLElement>, path: string) => void
}

const AppNavMenuList = (props: props) => {
  const location = useLocation()
  return (
    <ul
      className={classnames('AppNavMenuList', props.className, {
        'AppNavMenuList--root': props.isRoot,
      })}
    >
      {props.items.map((item, i) => {
        let child

        if (item.type === 'category') {
          child = (
            <AppNavSubMenuList
              item={item}
              onToggleMenu={props.onToggleMenu}
              isActive={dataTools.isActive(item.path, location.pathname)}
            />
          )
        } else if (item.type === 'page') {
          child = (
            <AppNavMenuListButton
              name={item.name}
              url={item.path}
              isActive={dataTools.isActive(item.path, location.pathname)}
            />
          )
        } else if (item.type === 'link') {
          child = <AppNavMenuListButton name={item.name} url={item.url} />
        }

        return (
          <li key={i} className="AppNavMenuList__item">
            {child}
          </li>
        )
      })}
    </ul>
  )
}

AppNavMenuList.propTypes = {
  items: ItemsPropType,
  isRoot: PropTypes.bool,
  className: PropTypes.string,
  onToggleMenu: PropTypes.func,
}

AppNavMenuList.defaultProps = {
  items: [],
  isRoot: false,
  className: '',
  onToggleMenu: () => {},
}

export default AppNavMenuList
