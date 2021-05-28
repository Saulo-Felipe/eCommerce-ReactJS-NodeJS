import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import AddProduct from './pages/admin/AddProduct/AddProduct'
import Header from './components/header/Header'
import Register from './pages/register/Register'

function Teste() {
  return <h1>Teste</h1>
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/admin/Dashboard" component={Teste}></Route>
          <Route path="/register" component={Register}/>
          <Route path="/admin/new-product" component={AddProduct}></Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
