import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {isAuthenticated} from './isAuthenticated'


export const PrivateRoutes = ({ component: Component, ...rest }) => (

	<Route 
		{...rest} 
		render={(props) => true ? (
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