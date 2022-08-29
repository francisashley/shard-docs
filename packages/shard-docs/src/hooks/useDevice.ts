import { useState, useEffect } from 'react'
import useWindowSize from '../hooks/useWindowSize'

type device = 'mobile' | 'desktop'

const DESKTOP_BREAKPOINT = 1024

const getDevice = (windowWidth: number = 0): device => {
  return windowWidth > DESKTOP_BREAKPOINT ? 'desktop' : 'mobile'
}

export default function usePagination(): [device] {
  const windowSize = useWindowSize()

  const [device, setDevice] = useState(getDevice(windowSize.width))

  useEffect(() => setDevice(getDevice(windowSize.width)), [windowSize.width])

  return [device]
}
