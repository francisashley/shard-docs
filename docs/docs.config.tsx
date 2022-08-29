import GetStartedContent from './content/get-started.mdx'
import ConfigContent from './content/config.mdx'
import DataContent from './content/data.mdx'
import CodeSampleShardContent from './content/shards/code-sample-shard.mdx'
import SectionShardContent from './content/shards/section-shard.mdx'

export default {
  title: 'Shard docs',
  basePath: '/docs/',
  data: [
    { name: 'Get started', content: <GetStartedContent /> },
    { name: 'Config', content: <ConfigContent /> },
    { name: 'Data', content: <DataContent /> },
    {
      name: 'Shards',
      content: [
        { name: '<CodeSample />', content: <CodeSampleShardContent /> },
        { name: '<Section />', content: <SectionShardContent /> },
      ],
    },
    { name: 'Github', content: 'http://github.com/fa-repo/shard-docs' },
  ],
}
