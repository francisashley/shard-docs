import React from "react";
import { render } from "react-dom";

import { MDXProvider } from "@mdx-js/react";

import CodeBlock from "@fa-repo/shard-docs/dist/renderers/CodeBlock";
import ShardDocs from "@fa-repo/shard-docs";

import "@fa-repo/shard-docs/dist/shard-docs.css";
import "@fa-repo/shard-docs/dist/shards/section.css";
import "@fa-repo/shard-docs/dist/shards/code-sample.css";

// Documents
import EssentialsGetStartedDocument from "./pages/1-essentials-get-started.mdx";
import EssentialsSchemaReferenceDocument from "./pages/1-source-schema.mdx";
import EssentialsApiReferenceDocument from "./pages/1-reference-api.mdx";
import ExamplesHelloWorldDocument from "./pages/2-examples-hello-world.mdx";
import ShardsCodeSampleShardDocument from "./pages/3-shards-code-sample.mdx";
import ShardsSectionShardDocument from "./pages/3-shards-section.mdx";

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
            { type: 'document', title: "Get started", document: <EssentialsGetStartedDocument /> },
            { type: 'document', title: "Source", document: <EssentialsSchemaReferenceDocument /> },
            { type: 'document', title: "API", document: <EssentialsApiReferenceDocument /> }
          ]
        },
        {
          type: 'folder',
          title: "Examples",
          folder: [
            { type: 'document', title: "Hello world", document: <ExamplesHelloWorldDocument /> }
          ]
        },
        {
          type: 'folder',
          title: "Shards",
          folder: [
            { type: 'document', title: "<CodeSample />", document: <ShardsCodeSampleShardDocument /> },
            { type: 'document', title: "<Section />", document: <ShardsSectionShardDocument /> }
          ]
        },
        { type: 'document', title: "Github", externalLink: "http://github.com/fa-repo/shard-docs" }
      ]}
    />
  </MDXProvider>,
  document.getElementById("root")
);
