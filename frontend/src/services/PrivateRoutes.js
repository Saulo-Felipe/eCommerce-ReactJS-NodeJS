import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isAuthenticated = () => {
  const token = localStorage.getItem("token_login")

  try {
    if (token)
      return true
    else 
      return false
  }
  catch(error) {
    return false
  }
  
}


export const PrivateRouter = ({ component: Component, ...rest }) => {
  return <Route 
    {...rest}
    render={(props) => (
      isAuthenticated()
        ? <Component {...props} />
        : <Redirect to={"/"}/>
    )}
  />
    
}
