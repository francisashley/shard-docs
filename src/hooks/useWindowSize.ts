import { useState, useEffect } from 'react'

// pinched from https://usehooks.com/useWindowSize/

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined as number | undefined,
    height: undefined as number | undefined,
  })
  useEffect(() => {
    function onResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}
export default useWindowSize
