import React from "react";
import { render } from "react-dom";

import { MDXProvider } from "@mdx-js/react";

import CodeBlock from "@fa-repo/shard-docs/dist/renderers/CodeBlock";
import ShardDocs from "@fa-repo/shard-docs";

import "@fa-repo/shard-docs/dist/shard-docs.css";
import "@fa-repo/shard-docs/dist/shards/section.css";
import "@fa-repo/shard-docs/dist/shards/code-sample.css";

// Essentials
import GetStarted from "./pages/1-essentials-get-started.mdx";
import ApiReference from "./pages/1-reference-api.mdx";
import SchemaReference from "./pages/1-source-schema.mdx";

// Examples
import HelloWorld from "./pages/2-examples-hello-world.mdx";

// Shards
import CodeSampleShard from "./pages/3-shards-code-sample.mdx";
import SectionShard from "./pages/3-shards-section.mdx";

const components = {
  pre: props => {
    if (props?.children?.props?.mdxType === "code") {
      return props.children;
    } else {
      return <pre {...props} />;
    }
  },
  code: CodeBlock
};

render(
  <MDXProvider components={components}>
    <ShardDocs
      title="@fa-repo/shard-docs"
      description="A doc manager written in React for organising and viewing MDX files."
      source={[
        {
          type: 'folder',
          title: "Essentials",
          folder: [
            { type: 'document', title: "Get started", document: <GetStarted /> },
            { type: 'document', title: "Source", document: <SchemaReference /> },
            { type: 'document', title: "API", document: <ApiReference /> }
          ]
        },
        {
          type: 'folder',
          title: "Examples",
          folder: [
            { type: 'document', title: "Hello world", document: <HelloWorld /> }
          ]
        },
        {
          type: 'folder',
          title: "Shards",
          folder: [
            { type: 'document', title: "<CodeSample />", document: <CodeSampleShard /> },
            { type: 'document', title: "<Section />", document: <SectionShard /> }
          ]
        },
        { type: 'document', title: "Github", externalLink: "http://github.com/fa-repo/shard-docs" }
      ]}
    />
  </MDXProvider>,
  document.getElementById("root")
);
