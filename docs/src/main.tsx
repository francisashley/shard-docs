import React from 'react'
import ReactDOM from 'react-dom/client'
import { MDXProvider } from '@mdx-js/react'
import ShardDocs, { CodeBlockRenderer } from '../../dist/index'

import '../../dist/index.css'

// Content
import EssentialsGetStartedContent from '../content/1-essentials-get-started.mdx'
import EssentialsSchemaReferenceContent from '../content/1-source-schema.mdx'
import EssentialsApiReferenceContent from '../content/1-reference-api.mdx'
import ShardsCodeSampleShardContent from '../content/3-shards-code-sample.mdx'
import ShardsSectionShardContent from '../content/3-shards-section.mdx'

const components = {
  pre: (props: any) => {
    if (props?.children?.props?.mdxType === 'code') {
      return props.children
    } else {
      return <pre {...props} />
    }
  },
  code: CodeBlockRenderer,
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MDXProvider components={components}>
      <ShardDocs
        title="Shard docs"
        data={[
          { name: 'Get started', content: <EssentialsGetStartedContent /> },
          { name: 'Content', content: <EssentialsSchemaReferenceContent /> },
          { name: 'API', content: <EssentialsApiReferenceContent /> },
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
    </MDXProvider>
  </React.StrictMode>
)
