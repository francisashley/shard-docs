import React from 'react'
import ReactDOM from 'react-dom/client'
import ShardDocs from '@fa-repo/shard-docs'
import '@fa-repo/shard-docs/dist/index.css'
import config from '../docs.config.tsx'

type dataItem = {
  name: string
  content: string | dataItem[] | React.ReactNode
}

const { title = '', data = [] } = config as { title: string; data: dataItem[] }

const root = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ShardDocs title={title} data={data} />
  </React.StrictMode>
)
