import React from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";

type CodeBlockRendererProps = {
  children: string;
  className?: string;
  language: Language;
}

export default (props: CodeBlockRendererProps) => {
  const language = props.language || props.className?.replace(/language-/, "");

  return (
    <Highlight {...defaultProps} code={props.children.trim()} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={className}>
          <code>
            {tokens.map((line, i) => {
              return (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </code>
        </pre>
      )}
    </Highlight>
  );
};
