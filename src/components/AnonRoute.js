import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

function AnonRoute({ component: Component, isLoggedin, isBusinessAccount, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if(!isLoggedin) {
          return (<Component {...props}/>)
        } else if (isLoggedin && isBusinessAccount) {
          return (<Redirect to="/business"/>)
        } else {
          return (<Redirect to="/customer"/>)
        }
      }
      }
    />
  );
}

export default withAuth(AnonRoute);
