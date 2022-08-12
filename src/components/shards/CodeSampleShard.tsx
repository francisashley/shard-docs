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

/**
 * CodeSampleShard
 */

type props = {
  title?: string
  lang: Language
  sourceCode: string
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
    title: PropTypes.string,
    lang: PropTypes.string,
    sourceCode: PropTypes.string,
    repository: PropTypes.string,
    useIframe: PropTypes.bool,
    iframeHead: PropTypes.string,
    iframeStyle: PropTypes.object,
  }

  static defaultProps = {
    title: '',
    lang: 'jsx',
    sourceCode: '',
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
    const showHeader = props.title || props.sourceCode || props.repository
    const displayCode = this.state.displayCode
    let children = props.children as React.ReactNode

    if (children) {
      if (isArray(children)) {
        children.map((child, i) => <child.type {...child.props} key={this.state.id + i} />)
      }
      // else if (children) {
      //   children = <children.type {...children.props} key={this.state.id} />;
      // }
    }

    return (
      <section className={classnames('CodeSampleShard', props.className)}>
        {showHeader && (
          <header className="CodeSampleShard__header">
            <h3 className="CodeSampleShard__title" title={props.title}>
              {props.title}
            </h3>
            <menu className="CodeSampleShard__menu">
              <Link
                className="CodeSampleShard__menu-link CodeSampleShard__menu-link--code"
                preventDefault
                onClick={this.toggleCode}
                aria-label="Toggle code"
              >
                <CodeIcon className="CodeSampleShard__menu-icon" />
              </Link>

              {props.repository && (
                <Link
                  className="CodeSampleShard__menu-link CodeSampleShard__menu-link--repository"
                  href={props.repository}
                  external
                  aria-label="View repository"
                >
                  <GithubIcon className="CodeSampleShard__menu-icon" />
                </Link>
              )}
            </menu>
          </header>
        )}
        <div className="CodeSampleShard__body">
          {displayCode && (
            <div className="CodeSampleShard__source-code">
              <CodeBlockRenderer aria-label="Source code" language={props.lang}>
                {props.sourceCode}
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
