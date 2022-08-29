import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'

type props = {
  children: string
  className?: string
  language: Language
  'aria-label'?: string
}

export default (props: props) => {
  const language = (props.language || props.className?.replace(/language-/, '')) as Language

  return (
    <Highlight {...defaultProps} code={props.children.trim()} language={language} theme={undefined}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} aria-label={props['aria-label'] || ''}>
          <code>
            {tokens.map((line, i) => {
              return (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              )
            })}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
