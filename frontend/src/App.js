import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {isAuthenticated} from './services/isAuthenticated'
import Home from './pages/home/Home'
import AddProduct from './pages/admin/AddProduct/AddProduct'
import AddCategory from './pages/admin/AddCategory/AddCategory'
import Header from './components/header/Header'
import Register from './pages/register/Register'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Search from './pages/search/Search'
import Footer from './components/footer/Footer'
import ClientDashboard from './pages/client_dashboard/Client_dashboard'
import { PrivateRoutes } from './services/PrivateRoutes'
import { Like } from './components/context/Likes'
import { ProfilePhoto } from './components/context/ProfilePhoto'
import LeftMenuMobile from './components/menu_mobile/LeftMenuMobile'
import Product from './pages/product/Product'


function App() {
  return (
    <>
      <BrowserRouter>
        <Like>
          <ProfilePhoto>
            <LeftMenuMobile />
            <Header />
            <Switch>
              <Route path="/" component={Home} exact />
              <PrivateRoutes path="/admin/dashboard" component={Dashboard} />
              <PrivateRoutes path="/admin/new-product" component={AddProduct} />
              <PrivateRoutes path="/admin/new-category" component={AddCategory} />

              <PrivateRoutes path="/client_dashboard/user-profile" >
                <ClientDashboard ChildComponent={"UserProfile"} />
              </PrivateRoutes>
              <PrivateRoutes path="/client_dashboard/Compras">
                <ClientDashboard ChildComponent={"Purchases"} />
              </PrivateRoutes>
              <PrivateRoutes path="/client_dashboard/favorites">
                <ClientDashboard ChildComponent={"Favorite"} />
              </PrivateRoutes>

              <Route path="/register" component={Register} />
              <Route path="/search/:value" component={Search} />

              <Route path="/product/:id/:description" component={Product}/>
            </Switch>
          </ProfilePhoto>
        </Like>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App;
