import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import AddProduct from './pages/admin/AddProduct/AddProduct'
import AddCategory from './pages/admin/AddCategory/AddCategory'
import Header from './components/header/Header'
import Register from './pages/register/Register'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Search from './pages/search/Search'
import Footer from './components/footer/Footer'
import UserProfile from './pages/userProfile/UserProfile'
import { PrivateRoutes } from './services/PrivateRoutes'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path="/" component={Home} exact />
          <PrivateRoutes path="/admin/dashboard" component={Dashboard} />
          <PrivateRoutes path="/admin/new-product" component={AddProduct} />
          <PrivateRoutes path="/admin/new-category" component={AddCategory} />
          <PrivateRoutes path="/profile/:id" component={UserProfile}/>
          <Route path="/register" component={Register} />
          <Route path="/search/:value" component={Search} />
        </Switch>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App;
