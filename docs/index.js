import React from "react";
import { render } from "react-dom";

import { MDXProvider } from "@mdx-js/react";

import ShardDocs, { CodeBlockRenderer } from "../dist/index";

import "../dist/index.css";
import "../dist/shards/SectionShard.css";
import "../dist/shards/CodeSampleShard.css";

// Content
import EssentialsGetStartedContent from "./content/1-essentials-get-started.mdx";
import EssentialsSchemaReferenceContent from "./content/1-source-schema.mdx";
import EssentialsApiReferenceContent from "./content/1-reference-api.mdx";
import ExamplesHelloWorldContent from "./content/2-examples-hello-world.mdx";
import ShardsCodeSampleShardContent from "./content/3-shards-code-sample.mdx";
import ShardsSectionShardContent from "./content/3-shards-section.mdx";

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
      title="Shard docs"
      data={[
        {
          type: 'category',
          name: "Essentials",
          items: [
            { type: 'page', name: "Get started", content: <EssentialsGetStartedContent /> },
            { type: 'page', name: "Content", content: <EssentialsSchemaReferenceContent /> },
            { type: 'page', name: "API", content: <EssentialsApiReferenceContent /> }
          ]
        },
        {
          type: 'category',
          name: "Examples",
          items: [
            { type: 'page', name: "Hello world", content: <ExamplesHelloWorldContent /> }
          ]
        },
        {
          type: 'category',
          name: "Shards",
          items: [
            { type: 'page', name: "<CodeSample />", content: <ShardsCodeSampleShardContent /> },
            { type: 'page', name: "<Section />", content: <ShardsSectionShardContent /> }
          ]
        },
        { type: 'link', name: "Github", url: "http://github.com/fa-repo/shard-docs", external: true }
      ]}
    />
  </MDXProvider>,
  document.getElementById("root")
);
