import React from 'react'
import PropTypes from 'prop-types'

import '../assets/github.css'
import './MainContent.scss'
import '../assets/prism-github.css'

type props = {
  title: string
  content: string | React.ReactNode
}
const MainContent = (props: props) => {
  return (
    <article className="MainContent">
      <div className="MainContent__body markdown-body">
        <h1>{props.title}</h1>
        {props.content}
      </div>
    </article>
  )
}

MainContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.element,
}

MainContent.defaultProps = {
  title: '',
  content: null,
}

export default MainContent
