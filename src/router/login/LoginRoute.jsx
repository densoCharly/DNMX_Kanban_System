import React from "react";
import { Route, Redirect } from "react-router-dom";
import User from '../../requests/User'
import {selectUser} from '../../reducers/UserReducer'
import {useSelector} from 'react-redux'

const LoginRoute = ({ tokenP, rol, component: Component, ...rest }) => {
  console.log(localStorage.getItem('token')?'true':'false')
  return (
    <Route
      {...rest}
      component={(props) =>
        localStorage.getItem('token')
        ? 
        (
          <Redirect
            to='/home'
          />
        ) 
        : 
        (
            <Component tokenP={tokenP} rol = {rol} />
        )
      }
    />
  );
};

export default LoginRoute;