import React from "react";
import { render } from "react-dom";

import { MDXProvider } from "@mdx-js/react";

import ShardDocs, { CodeBlockRenderer } from "@fa-repo/shard-docs";

import "@fa-repo/shard-docs/dist/index.css";
import "@fa-repo/shard-docs/dist/shards/SectionShard.css";
import "@fa-repo/shard-docs/dist/shards/CodeSampleShard.css";

// Documents
import EssentialsGetStartedDocument from "./content/1-essentials-get-started.mdx";
import EssentialsSchemaReferenceDocument from "./content/1-source-schema.mdx";
import EssentialsApiReferenceDocument from "./content/1-reference-api.mdx";
import ExamplesHelloWorldDocument from "./content/2-examples-hello-world.mdx";
import ShardsCodeSampleShardDocument from "./content/3-shards-code-sample.mdx";
import ShardsSectionShardDocument from "./content/3-shards-section.mdx";

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
      title="@fa-repo/shard-docs"
      description="A doc manager written in React for organising and viewing MDX files."
      content={[
        {
          type: 'category',
          name: "Essentials",
          items: [
            { type: 'document', name: "Get started", document: <EssentialsGetStartedDocument /> },
            { type: 'document', name: "Content", document: <EssentialsSchemaReferenceDocument /> },
            { type: 'document', name: "API", document: <EssentialsApiReferenceDocument /> }
          ]
        },
        {
          type: 'category',
          name: "Examples",
          items: [
            { type: 'document', name: "Hello world", document: <ExamplesHelloWorldDocument /> }
          ]
        },
        {
          type: 'category',
          name: "Shards",
          items: [
            { type: 'document', name: "<CodeSample />", document: <ShardsCodeSampleShardDocument /> },
            { type: 'document', name: "<Section />", document: <ShardsSectionShardDocument /> }
          ]
        },
        { type: 'link', name: "Github", url: "http://github.com/fa-repo/shard-docs", external: true }
      ]}
    />
  </MDXProvider>,
  document.getElementById("root")
);
