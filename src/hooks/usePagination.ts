import { useState } from 'react'
import dataTools from '../utils/dataTools'

type pagination = { all: page[]; current: page | null; prev: page | null; next: page | null }

export default function usePagination(
  data: data,
  currentPath: string = '',
  basePath: string = ''
): [pagination, { setCurrentPath: (path?: string) => void }] {
  const pages = dataTools.getPages(data)

  const [parsedData, setParsedData] = useState({
    all: pages,
    current: dataTools.getCurrentPage(pages, currentPath, basePath),
    prev: dataTools.getPrevPage(pages, currentPath),
    next: dataTools.getNextPage(pages, currentPath),
  })

  const setCurrentPath = (currentPath: string = '') => {
    setParsedData({
      all: pages,
      current: dataTools.getCurrentPage(pages, currentPath, basePath),
      prev: dataTools.getPrevPage(pages, currentPath),
      next: dataTools.getNextPage(pages, currentPath, basePath),
    })
  }

  return [parsedData, { setCurrentPath }]
}
