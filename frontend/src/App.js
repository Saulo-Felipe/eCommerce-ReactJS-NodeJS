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
import Client_dashboard from './pages/client_dashboard/Client_dashboard'
import { PrivateRoutes } from './services/PrivateRoutes'
import { Like } from './components/context/Likes'
import LeftMenuMobile from './components/menu_mobile/LeftMenuMobile'

function App() {
  return (
    <>
      <BrowserRouter>
        <LeftMenuMobile />
        <Like>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <PrivateRoutes path="/admin/dashboard" component={Dashboard} />
            <PrivateRoutes path="/admin/new-product" component={AddProduct} />
            <PrivateRoutes path="/admin/new-category" component={AddCategory} />

            {/*Client Dashboard*/}
              <PrivateRoutes path="/client_dashboard/user-profile" >
                <Client_dashboard child_component={"UserProfile"} />
              </PrivateRoutes>

              <PrivateRoutes path="/client_dashboard/Compras">
                <Client_dashboard child_component={"Purchases"} />
              </PrivateRoutes>

              <PrivateRoutes path="/client_dashboard/favorites">
                <Client_dashboard child_component={"Favorite"} />
              </PrivateRoutes>
            {/*Client Dashboard*/}

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
