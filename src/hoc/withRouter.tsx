import React from 'react'
import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

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

    return (
      <Routes>
        <Route path="*" element={<EnrichedWrappedComponent />} />
      </Routes>
    )
  }
}

export default withRouter
