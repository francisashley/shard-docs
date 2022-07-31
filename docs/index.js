import React from 'react'
import { render } from 'react-dom'

import { MDXProvider } from '@mdx-js/react'

import ShardDocs, { CodeBlockRenderer } from '../dist/index'

import '../dist/index.css'
import '../dist/shards/SectionShard.css'
import '../dist/shards/CodeSampleShard.css'

// Content
import EssentialsGetStartedContent from './content/1-essentials-get-started.mdx'
import EssentialsSchemaReferenceContent from './content/1-source-schema.mdx'
import EssentialsApiReferenceContent from './content/1-reference-api.mdx'
import ExamplesHelloWorldContent from './content/2-examples-hello-world.mdx'
import ShardsCodeSampleShardContent from './content/3-shards-code-sample.mdx'
import ShardsSectionShardContent from './content/3-shards-section.mdx'

const components = {
  pre: (props) => {
    if (props?.children?.props?.mdxType === 'code') {
      return props.children
    } else {
      return <pre {...props} />
    }
  },
  code: CodeBlockRenderer,
}

render(
  <MDXProvider components={components}>
    <ShardDocs
      title="Shard docs"
      data={[
        { name: 'Get started', content: <EssentialsGetStartedContent /> },
        { name: 'Content', content: <EssentialsSchemaReferenceContent /> },
        { name: 'API', content: <EssentialsApiReferenceContent /> },
        {
          name: 'Examples',
          content: [{ name: 'Hello world', content: <ExamplesHelloWorldContent /> }],
        },
        {
          name: 'Shards',
          content: [
            { name: '<CodeSample />', content: <ShardsCodeSampleShardContent /> },
            { name: '<Section />', content: <ShardsSectionShardContent /> },
          ],
        },
        { name: 'Github', content: 'http://github.com/fa-repo/shard-docs' },
      ]}
    />
  </MDXProvider>,
  document.getElementById('root')
)
