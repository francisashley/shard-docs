import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Link from '../Link'
import './SectionShard.scss'

type SectionShardProps = {
  title?: string
  persistState?: string
  className?: string
  children?: React.ReactNode
}

type SectionShardState = {
  expanded: boolean
  storageId: string
}

class SectionShard extends React.Component<SectionShardProps, SectionShardState> {
  static propTypes = {
    title: PropTypes.string.isRequired,
    persistState: PropTypes.string,
  }

  static defaultProps = {
    title: '',
    persistState: null,
  }

  state = {
    expanded: true,
    storageId: 'SectionShard-state-' + this.props.persistState,
  }

  componentDidMount() {
    if (this.props.persistState) {
      this.setState({ expanded: this.isExpanded() })
    }
  }

  isExpanded = () => {
    const state = localStorage.getItem(this.state.storageId)
    return state === null ? this.state.expanded : state === 'true'
  }

  toggle = () => {
    const expanded = !this.isExpanded()
    if (this.props.persistState) localStorage.setItem(this.state.storageId, String(expanded))
    this.setState({ expanded })
  }

  render() {
    const { title, persistState, ...props } = this.props
    return (
      <section {...props} className={classnames('SectionShard', props.className)}>
        <h2 className="SectionShard__title">
          <Link
            className="SectionShard__title-link"
            href="#"
            onClick={() => this.toggle()}
            preventDefault
            text={title}
          />
        </h2>
        {this.isExpanded() && <div className="SectionShard__content">{props.children}</div>}
      </section>
    )
  }
}

export default SectionShard
