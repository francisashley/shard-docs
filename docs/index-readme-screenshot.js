import React from "react";
import { render } from "react-dom";

import { MDXProvider } from "@mdx-js/react";

import ShardDocs, { CodeBlockRenderer } from "@fa-repo/shard-docs";

import "@fa-repo/shard-docs/dist/index.css";
import "@fa-repo/shard-docs/dist/shards/SectionShard.css";
import "@fa-repo/shard-docs/dist/shards/CodeSampleShard.css";

const components = {
  pre: props => {
    if (props?.children?.props?.mdxType === "code") {
      return props.children;
    } else {
      return <pre {...props} />;
    }
  },
  code: CodeBlockRenderer
};

render(
  <MDXProvider components={components}>
    <ShardDocs
      title="ShardDocs"
      description="ShardDocs document organiser."
      source={[
        {
          type: 'folder',
          title: "Essentials",
          folder: [
            { type: 'document', title: "Install", document: <h1>Install</h1> },
            { type: 'document', title: "Basic usage", document: <h1>Basic usage</h1> }
          ]
        },
        {
          type: 'folder',
          title: "Examples",
          folder: [
            { type: 'document', title: "Use case A", document: <h1>Use case A</h1> },
            { type: 'document', title: "Use case B", document: <h1>Use case B</h1> }
          ]
        },
        { title: "Github", externalLink: "http://github.com" }
      ]}
    />
  </MDXProvider>,
  document.getElementById("root")
);
