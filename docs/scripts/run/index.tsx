import React from 'react'
import ReactDOM from 'react-dom/client'
import ShardDocs from '../../../dist/index'
import config from '../../docs.config'
import '../../../dist/index.css'

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
