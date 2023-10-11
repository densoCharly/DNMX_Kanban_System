import React from "react";
import { Route, Redirect } from "react-router-dom"
//import User from '../../requests/User'
import { useSelector } from "react-redux";
import { selectUser } from '../../reducers/UserReducer'

const EspecialistPCRoute = ({ tokenP, rol, component: Component, ...rest }) => {
  const user = useSelector(selectUser) 

  return (
    <Route
      {...rest}
      component={(props) =>
        localStorage.getItem('token')&&localStorage.getItem('user_role')===2
        ? (
          <Component tokenP={tokenP} props={props} rol = {rol} />
        ) : (
          <Redirect
            to='/login'
          />
        )
      }
    />
  );
};

export default EspecialistPCRoute;