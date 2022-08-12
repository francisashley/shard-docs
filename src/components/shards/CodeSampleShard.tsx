import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import CodeIcon from '@/components/icons/CodeIcon'
import GithubIcon from '@/components/icons/GithubIcon'
import isArray from 'lodash/isArray'
import uniqueId from 'lodash/uniqueId'
import CodeBlockRenderer from '@/components/renderers/CodeBlockRenderer'
import Link from '../Link'
import Frame from 'react-frame-component'
import './CodeSampleShard.scss'
import { Language } from 'prism-react-renderer'
import reactElementToJSXString from 'react-element-to-jsx-string'

/**
 * CodeSampleShard
 */

type props = {
  lang: Language
  repository?: string
  useIframe?: boolean
  iframeHead?: string
  iframeStyle?: React.StyleHTMLAttributes<HTMLStyleElement>
  children?: React.ReactNode
  className?: string
}

type state = {
  displayCode: boolean
  id: string
}

class CodeSampleShard extends React.Component<props, state> {
  static propTypes = {
    lang: PropTypes.string,
    repository: PropTypes.string,
    useIframe: PropTypes.bool,
    iframeHead: PropTypes.string,
    iframeStyle: PropTypes.object,
  }

  static defaultProps = {
    lang: 'jsx',
    repository: '',
    useIframe: false,
    iframeHead: '',
    iframeStyle: {},
  }

  state = {
    displayCode: false,
    id: uniqueId(),
  }

  toggleCode = () => {
    this.setState({ displayCode: !this.state.displayCode })
  }

  render() {
    const props = this.props
    const displayCode = this.state.displayCode
    let children = props.children as React.ReactNode

    if (children) {
      if (isArray(children)) {
        children.map((child, i) => <child.type {...child.props} key={this.state.id + i} />)
      }
    }

    const sourceCode = reactElementToJSXString(children)

    return (
      <section className={classnames('CodeSampleShard', props.className)}>
        <header className="CodeSampleShard__header">
          <menu className="CodeSampleShard__menu">
            {props.repository && (
              <Link
                className="CodeSampleShard__menu-link CodeSampleShard__menu-link--repository"
                href={props.repository}
                external
                hideIcon
                aria-label="View repository"
              >
                <GithubIcon className="CodeSampleShard__menu-icon" />
              </Link>
            )}
            <Link
              className="CodeSampleShard__menu-link CodeSampleShard__menu-link--code"
              preventDefault
              onClick={this.toggleCode}
              aria-label="Toggle code"
            >
              <CodeIcon className="CodeSampleShard__menu-icon" />
            </Link>
          </menu>
        </header>
        <div className="CodeSampleShard__body">
          {displayCode && (
            <div className="CodeSampleShard__source-code">
              <CodeBlockRenderer aria-label="Source code" language={props.lang}>
                {sourceCode}
              </CodeBlockRenderer>
            </div>
          )}
          <div className="CodeSampleShard__example">
            {props.useIframe ? (
              <Frame
                initialContent={`<!DOCTYPE html><html><head>${props.iframeHead}</head><body><div class="frame-root"></div></body></html>`}
                style={props.iframeStyle}
                role="presentation"
              >
                {children}
              </Frame>
            ) : (
              children
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default CodeSampleShard
