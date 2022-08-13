import EssentialsGetStartedContent from './content/1-essentials-get-started.mdx'
import EssentialsSchemaReferenceContent from './content/1-source-schema.mdx'
import EssentialsApiReferenceContent from './content/1-reference-api.mdx'
import ShardsCodeSampleShardContent from './content/3-shards-code-sample.mdx'
import ShardsSectionShardContent from './content/3-shards-section.mdx'

export default {
  title: 'Shard docs',
  data: [
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
  ],
}
