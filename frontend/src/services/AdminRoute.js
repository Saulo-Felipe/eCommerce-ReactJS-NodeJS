import React from "react";
import { Route, Redirect } from 'react-router-dom';

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
  
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const isAdmin = function() {
  try {
    const adminIds = [1]
    const token = localStorage.getItem('token_login')
    const tokenDecoded = parseJwt(token)

    var admin = false 

    adminIds.forEach((id) => {
      if (tokenDecoded.userId === id) {
        admin = true
      }
    })
    
    return admin
  }
  catch(error) {
    return false
  }
}

export const AdminRoute = ({ component: Component, ...rest }) => {
  return <Route 
    {...rest}
    render={(props) => (
      isAdmin()
        ? <Component {...props} />
        : <Redirect to={"/"}/>
    )}
  />
    
}