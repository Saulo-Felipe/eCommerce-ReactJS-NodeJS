import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import AddProduct from './pages/admin/AddProduct/AddProduct'
import Header from './components/header/Header'
import Register from './pages/register/Register'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Search from './pages/search/Search'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/admin/dashboard" component={Dashboard}></Route>
          <Route path="/admin/new-product" component={AddProduct}></Route>
          <Route path="/register" component={Register}/>
          <Route path="/search/:value" component={Search} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
