
import React from "react";
import { HashRouter, BrowserRouter, Route } from "react-router-dom";
import { RouteProps } from "react-router-dom";

type withRouterOptionsProps = {
  routerType?: 'hash' | 'browser';
}

function withRouter<props>(WrappedComponent: (props: props) => React.ReactElement<props>) {
  return (props: props & withRouterOptionsProps): React.ReactElement  => {
    const Router = ({
      hash: HashRouter,
      browser: BrowserRouter,
    }[props.routerType || 'hash']) as React.ElementType

    return (
      <Router>
        <Route component={(routerProps: RouteProps): React.ReactElement<props & { currentPath: string}> => {
          const currentPath = routerProps.location?.pathname || '';
          return <WrappedComponent {...props} currentPath={currentPath} />}
        } />
      </Router>
    );
  };
}

export default withRouter;