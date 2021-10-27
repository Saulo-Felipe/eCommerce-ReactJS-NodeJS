import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { isAuthenticated } from './services/isAuthenticated'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Register from './pages/register/Register'
import Search from './pages/search/Search'
import Footer from './components/footer/Footer'
import ClientDashboard from './pages/client_dashboard/Client_dashboard'
import { ProfilePhoto } from './components/context/ProfilePhoto'
import LeftMenuMobile from './components/menu_mobile/LeftMenuMobile'
import Product from './pages/product/Product'
import NoMatch from './pages/noMatch/NoMatch'
import ShopCart from './pages/shoppingCart/ShopCart'
import Dashboard from './pages/admin/dashboard/Dashboard'
import AddProduct from './pages/admin/AddProduct/AddProduct'
import EditProduct from './pages/admin/EditProduct/EditProduct'
import AddCategory from './pages/admin/AddCategory/AddCategory'
import { PrivateRoute } from './services/PrivateRoutes'
import { AdminRoute } from './services/AdminRoute'
import Checkout from './pages/checkout/Checkout'

function App() {

  const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)


  useEffect(() => {
    (async() => {
      var response = await isAuthenticated()

      if (response !== null) {
        setIsLogged(true)
        if (Number(response.isAdmin) === 1)
          setIsAdmin(true)
      }
    })();
  }, [])

  

  return (
    <>
      <BrowserRouter>
        <ProfilePhoto>
          <LeftMenuMobile />
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} />
            <Route path="/search/:value" component={Search} />
            <Route path="/product/:id/:description" component={Product} />

            <PrivateRoute path="/client_dashboard/user-profile" component={() => <ClientDashboard ChildComponent={"UserProfile"} />} />
            <PrivateRoute path="/client_dashboard/Compras" component={() => <ClientDashboard ChildComponent={"Purchases"} />} />
            <PrivateRoute path="/client_dashboard/favorites" component={() => <ClientDashboard ChildComponent={"Favorite"} />} />
            <PrivateRoute path="/my-shopping-cart" component={ShopCart} />
            <PrivateRoute path="/checkout" component={Checkout} />


            <AdminRoute path="/admin/new-category" component={AddCategory} />
            <AdminRoute path="/admin/dashboard" component={Dashboard} />
            <AdminRoute path="/admin/new-product" component={AddProduct} />
            <AdminRoute path="/admin/product/edit/:paramsId/:paramsDescription" component={EditProduct} />
            
            <Route path="*" >
              <NoMatch />
            </Route>

          </Switch>
        </ProfilePhoto>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App;
