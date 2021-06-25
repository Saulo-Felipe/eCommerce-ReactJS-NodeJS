import React from 'react'
import { Redirect, Route } from 'react-router-dom'


export const PrivateRoutes = ({ component: Component, ...rest }) => (
	<Route 
		{...rest} 
		render={props =>
		    localStorage.getItem("id") ? (
		  	    <Component {...props}/>
		    ) : (
		    	<Redirect 
		    	    to={{
		    		    pathname: '/',
		    		    state: { from: props.location }
		    	    }}
		        />
		    )
		}
	/>
)