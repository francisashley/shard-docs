import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ArrowDown from './icons/ArrowDown'
import ArrowRight from './icons/ArrowRight'
import BaseLink from '@fa-repo/base-react/dist/link'
import './NavSectionHeader.scss'

type props = {
  title?: string
  expanded?: boolean
  onClick?: () => void
  onToggle?: () => void
}

class NavSectionHeader extends React.Component<props> {
  static propTypes = {
    title: PropTypes.string,
    expanded: PropTypes.bool,
    onToggle: PropTypes.func,
  }

  static defaultProps = {
    title: '',
    expanded: false,
    onNavigate: () => {},
  }

  render() {
    const props = this.props

    return (
      <header className="sd-NavSectionHeader">
        <BaseLink
          className="sd-NavSectionHeader__link"
          href="#"
          preventDefault
          onClick={props.onToggle}
        >
          <h3 className="sd-NavSectionHeader__title">{props.title}</h3>
          <ArrowRight
            className={classnames(
              'sd-NavSectionHeader__arrow-icon',
              props.expanded && 'sd-NavSectionHeader__arrow-icon--expanded'
            )}
          />
        </BaseLink>
      </header>
    )
  }
}

export default NavSectionHeader
