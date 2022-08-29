import React from 'react'
import ReactDOM from 'react-dom/client'
import ShardDocs from '@fa-repo/shard-docs'
import '@fa-repo/shard-docs/dist/index.css'
import config from '../docs.config.tsx'

type dataItem = {
  name: string
  content: string | dataItem[] | React.ReactNode
}

type options = {
  title: string
  data: dataItem[]
  basePath: string
  hideBuiltWithShardDocs: boolean
  routerType: 'hash' | 'browser'
}

const {
  title = '',
  data = [],
  basePath = '/',
  hideBuiltWithShardDocs = false,
  routerType = 'hash',
}: options = config

const root = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ShardDocs
      title={title}
      data={data}
      basePath={basePath}
      hideBuiltWithShardDocs={hideBuiltWithShardDocs}
      routerType={routerType}
    />
  </React.StrictMode>
)
