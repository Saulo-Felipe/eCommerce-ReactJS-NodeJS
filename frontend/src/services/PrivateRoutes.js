import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {isAuthenticated} from './isAuthenticated'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import AddProduct from '../pages/admin/AddProduct/AddProduct'
import AddCategory from '../pages/admin/AddCategory/AddCategory'


var PrivateRoutes = [
  <Route path="/admin/new-category" component={AddCategory} />,
  <Route path="/admin/dashboard" component={Dashboard} />,
  <Route path="/admin/new-product" component={AddProduct} />
]

export { PrivateRoutes }
