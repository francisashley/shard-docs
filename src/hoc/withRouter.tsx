import React from 'react'
import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import { useLocation, useInRouterContext } from 'react-router-dom'

type withRouterOptionsProps = {
  routerType?: 'hash' | 'browser'
}

function withRouter<props>(WrappedComponent: (props: props) => React.ReactElement<props>) {
  return (props: props & withRouterOptionsProps): React.ReactElement => {
    const Router = {
      hash: HashRouter,
      browser: BrowserRouter,
    }[props.routerType || 'hash'] as React.ElementType

    const EnrichedWrappedComponent = (): React.ReactElement<props & { currentPath: string }> => {
      const location = useLocation()

      return <WrappedComponent {...props} currentPath={location.pathname} />
    }

    const inContext = useInRouterContext()

    if (inContext) {
      return (
        <Routes>
          <Route path="*" element={<EnrichedWrappedComponent />} />
        </Routes>
      )
    } else {
      return (
        <Router>
          <Routes>
            <Route path="*" element={<EnrichedWrappedComponent />} />
          </Routes>
        </Router>
      )
    }
  }
}

export default withRouter
