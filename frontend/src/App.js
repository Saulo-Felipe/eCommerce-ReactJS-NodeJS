import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {isAuthenticated} from './services/isAuthenticated'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Register from './pages/register/Register'
import Search from './pages/search/Search'
import Footer from './components/footer/Footer'
import ClientDashboard from './pages/client_dashboard/Client_dashboard'
import { PrivateRoutes } from './services/PrivateRoutes'
import { Like } from './components/context/Likes'
import { ProfilePhoto } from './components/context/ProfilePhoto'
import LeftMenuMobile from './components/menu_mobile/LeftMenuMobile'
import Product from './pages/product/Product'
import NoMatch from './pages/noMatch/NoMatch'
import ShopCart from './pages/shoppingCart/ShopCart'


function App() {

  const [isLogged, setIsLogged] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)

  const isLoggedRoutes = [
    <Route path="/client_dashboard/user-profile" >
      <ClientDashboard ChildComponent={"UserProfile"} />
    </Route>,
    <Route path="/client_dashboard/Compras">
      <ClientDashboard ChildComponent={"Purchases"} />
    </Route>,
    <Route path="/client_dashboard/favorites">
      <ClientDashboard ChildComponent={"Favorite"} />
    </Route>
  ]

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
        <Like>
        <ProfilePhoto>
          <LeftMenuMobile />
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} />
            <Route path="/search/:value" component={Search} />
            <Route path="/product/:id/:description" component={Product}/>

            {/*========| Login Routes |========*/}
            {
              isLogged === true 
              ? isLoggedRoutes.map(item => item)
              : <NoMatch />
            }

            {/*========| Administrative Routes |========*/}
            {
              isAdmin === true
              ? (
                <>
                {
                  PrivateRoutes.map(item => item)
                }
                  <Route path="/my-shopping-cart" component={ShopCart}/>
                </>)
              : <NoMatch/>
            }

            <Route path="*" >
              <NoMatch />
            </Route>

          </Switch>
        </ProfilePhoto>
        </Like>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App;
