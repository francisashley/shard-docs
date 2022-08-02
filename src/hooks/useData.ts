import { useState } from 'react'
import dataTools from '../utils/dataTools'

export default function useData(
  data: inputData,
  basePath: string = '/',
  currentPath: string = ''
): [data, { setCurrentPath: (path?: string) => void; toggleMenu: (path: string) => void }] {
  let initialData = dataTools.parse(data, basePath)
  initialData = dataTools.updateState(initialData, basePath, currentPath)

  const [parsedData, setParsedData] = useState(initialData)

  const setCurrentPath = (currentPath: string = '') => {
    setParsedData(dataTools.updateState(parsedData, basePath, currentPath))
  }

  const toggleMenu = (path: string) => {
    setParsedData(dataTools.toggleMenu(parsedData, path))
  }

  return [
    parsedData,
    {
      setCurrentPath,
      toggleMenu,
    },
  ]
}
