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
import Client_dashboard from './pages/client_dashboard/Client_dashboard'
import { PrivateRoutes } from './services/PrivateRoutes'
import { Like } from './components/context/Likes'

function App() {
  return (
    <>
      <BrowserRouter>
        <Like>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <PrivateRoutes path="/admin/dashboard" component={Dashboard} />
            <PrivateRoutes path="/admin/new-product" component={AddProduct} />
            <PrivateRoutes path="/admin/new-category" component={AddCategory} />
            <PrivateRoutes path="/profile/:id" component={UserProfile}/>
            <PrivateRoutes path="/client_dashboard" component={Client_dashboard} />
            <Route path="/register" component={Register} />
            <Route path="/search/:value" component={Search} />
          </Switch>
        </Like>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App;
