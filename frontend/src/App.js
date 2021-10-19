import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {isAuthenticated} from './services/isAuthenticated'
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

function App() {

  const [isLogged, setIsLogged] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)

  React.useEffect(() => {
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
            <Route path="/product/:id/:description" component={Product}/>

            {
              isLogged === true 
              ?
                <>
                  {
                    <>
                      <Route path="/client_dashboard/user-profile" >
                        <ClientDashboard ChildComponent={"UserProfile"} />
                      </Route>
                      <Route path="/client_dashboard/Compras">
                        <ClientDashboard ChildComponent={"Purchases"} />
                      </Route>
                      <Route path="/client_dashboard/favorites">
                        <ClientDashboard ChildComponent={"Favorite"} />
                      </Route>

                      <Route path="/my-shopping-cart" component={ShopCart}/>
                    </>
                  }

                  {
                    isAdmin === true 
                    ?
                      <>
                        <Route path="/admin/new-category"> <AddCategory/> </Route>
                        <Route path="/admin/dashboard"> <Dashboard /> </Route>
                        <Route path="/admin/new-product"> <AddProduct /> </Route>                      
                        <Route path="/admin/product/edit/:paramsId/:paramsDescription"> <EditProduct /> </Route>                      
                      </>
                    : <Route path="*" ><NoMatch /></Route>
                  }
                </>

              : <Route path="*" ><NoMatch /></Route>
            }

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
