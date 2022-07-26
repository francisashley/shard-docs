
import React from "react";
import { HashRouter, BrowserRouter, Route } from "react-router-dom";
import { RouteProps } from "react-router-dom";

type withRouterOptionsProps = {
  useBrowserRouter?: boolean
}

function withRouter<InputProps>(WrappedComponent: (props: InputProps) => React.ReactElement<InputProps>) {
  return (props: InputProps & withRouterOptionsProps): React.ReactElement  => {
    const Router = (props.useBrowserRouter ? BrowserRouter : HashRouter) as React.ElementType;
    return (
      <Router>
        <Route component={(routerProps: RouteProps): React.ReactElement<InputProps & { currentPath: string}> => {
          const currentPath = routerProps.location?.pathname || '';
          return <WrappedComponent {...props} currentPath={currentPath} />}
        } />
      </Router>
    );
  };
}

export default withRouter;