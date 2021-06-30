import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './S-Client_dashboard.css'
import {BrowserRouter, Switch, Route, useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Favorite from './favorites/Favorite'
import Purchases from './purchases/Purchases'

export default function Client_dashboard() {

  var location = useLocation()


  useEffect(() => {
    console.log('mudou')
    console.log(location.pathname)
  }, [location])


  var href = window.location.href

  useEffect(() => {
    if (href.indexOf('favorite') != -1) {

    } 
  }, [])

  return (
    <BrowserRouter>
      <div className="SearchPage favorite-page">
        <div className="TopFilter">
          <div className="d-flex flex-row mt-4 header-page-search">
            <div className="text-white pe-5 d-flex iconsNavigate mobile">
              <span className="material-icons-outlined iconNavigateSearch">home</span> Home
              <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> Dashboard
              <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> 
            </div>
            
            <h4 className="text-white titleSearch w-100">
              Meus Favoritos
            </h4>

            <div className="text-white pe-5 d-flex iconsNavigate desktop">
              <span className="material-icons-outlined iconNavigateSearch">home</span> Home
              <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> Dashboard
              <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> 
            </div>
          </div>
        </div>


        <div className="ContentSearch d-flex flex-box">
          <div className="LeftSearch LeftSearch-favorite ms-5">
            <div className="material-icons-outlined close-menu-filter-search text-end w-100">close</div>

            <div className="d-flex header-top-favorite">
              <div className="border-on-image-profile-favorite ">
                <div className="favorite-perfil-photo" style={{backgroundImage: `url(${require(`./UserProfile.jpg`).default})`}}>

                </div>
              </div>

              <div className="informations-favorite-page">
                <div className="favorite-name">Jubileu Amarelo</div>
                <div className="favorite-email">jubileuAmarelo@gmail.com</div>
              </div>
            </div>
            
            <div className="content-favorite-left mt-5">
              <div className="alternative-dashboard fixed-alternative">Dashboard</div>

              {/*=================| Alternatives Menu |===================*/}

              <Link to={"/client_dashboard/purchases"} className="no-href-decoration">
                <div className="normal-alternative">
                  <div class="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">shopping_bag</div>
                  <div className="title-norma-alternative title-buy icon-dashboard"> Compras</div>
                </div>
              </Link>

              <hr/>

              <Link to={"/client_dashboard/favorites"} className="no-href-decoration">
                <div className="normal-alternative">
                  <div class="material-icons-outlined icon-normal-alternative icon-favorite icon-dashboard">volunteer_activism</div>
                  <div className="title-norma-alternative active-favorite title-favorite icon-dashboard"> Favoritos</div>
                </div>
              </Link>

              <hr/>

              <div className="normal-alternative">
                <div class="material-icons-outlined icon-normal-alternative">support</div>
                <div className="title-norma-alternative"> Suporte</div>
              </div>

              <div className="alternative-dashboard fixed-alternative">Configurações</div>

              <div className="normal-alternative">
                <div class="material-icons-outlined icon-normal-alternative">manage_accounts</div>
                <div className="title-norma-alternative"> Meus dados pessoais</div>
              </div>

              <hr/>

              <div className="normal-alternative">
                <div class="material-icons-outlined icon-normal-alternative">location_on</div>
                <div className="title-norma-alternative"> Endereços</div>
              </div>

              <hr/>

              <div className="normal-alternative">
                <div class="material-icons-outlined icon-normal-alternative">credit_card</div>
                <div className="title-norma-alternative"> Metodos de pagamento</div>
              </div>

              {/*=================| Alternatives Menu |===================*/}

            </div>
          </div>

          <div className="container search-content-container">
            <div className="FilterTop d-flex">
              <h5 className="text-white">Lista de produtos salvos: </h5>
            </div>
            
              <Switch>
                <Route path="/client_dashboard/favorites" component={Favorite}/>
                <Route path="/client_dashboard/purchases" component={Purchases}/>
              </Switch>

          </div>
        </div>
      </div>
    </BrowserRouter>
	)
}