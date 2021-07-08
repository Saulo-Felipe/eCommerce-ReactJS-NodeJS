import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './S-Client_dashboard.css'
import {BrowserRouter, Switch, Route, useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Favorite from './favorites/Favorite'
import Purchases from './purchases/Purchases'
import UserProfile from './configs/User_Configs'
import {isAuthenticated} from '../../services/isAuthenticated'
import api from '../../services/api'

export default function Client_dashboard(props) {

  const [configs, setConfigs] = useState({ PagePosigion: '', TitleOne: '', TitleTwo: '' })
  const [userInformations, setUserInformations] = useState({profileImage: '', email: ''})

  var Child_component
  if (props.child_component === "Favorite") Child_component = Favorite
  else if (props.child_component === "Purchases") Child_component = Purchases
  else if (props.child_component === "UserProfile") Child_component = UserProfile

  useEffect(() => {

    (async () => {
      const response = await api.post('get-user', {type: 'header', id: isAuthenticated})

      if (response.data.error) return alert('Erro ao listar dados de usuario!')

      setUserInformations({
        user_name: response.data.user_name,
        profileImage: response.data.profile_photo,
        email: response.data.email,
      })
    })();

  }, [])



  return (
      <div className="SearchPage favorite-page">
        <div className="TopFilter">
          <div className="d-flex flex-row mt-4 header-page-search">
            <div className="text-white pe-5 d-flex iconsNavigate mobile">
              <span className="material-icons-outlined iconNavigateSearch">home</span> Home
              <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> Dashboard
              <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> {configs.TitleOne}
            </div>

            <div className="text-white pe-5 d-flex iconsNavigate desktop">
              <span className="material-icons-outlined iconNavigateSearch">home</span> Home
              <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> Dashboard
              <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> {configs.PagePosigion}
            </div>
          </div>
        </div>


        <div className="ContentSearch d-flex flex-box">
          <div className="LeftSearch-favorite ms-5 menu-dashboard-client">
            <div className="material-icons-outlined close-menu-filter-search text-end w-100 pe-1 mt-2">close</div>

            <div className="d-flex header-top-favorite">
              <div className="border-on-image-profile-favorite ">
                <div className="favorite-perfil-photo" style={{backgroundImage: `url(${require(`./configs/profile-images/${userInformations.profileImage || 'user.png'}`).default})`}}>

                </div>
              </div>

              <div className="informations-favorite-page">
                <div className="favorite-name">{userInformations.user_name}</div>
                <div className="favorite-email">{userInformations.email}</div>
              </div>
            </div>
            
            <div className="content-favorite-left mt-5">
              <div className="alternative-dashboard fixed-alternative">Dashboard</div>

              {/*=================| Alternatives Menu |===================*/}

              <Link to={"/client_dashboard/Compras"} className="no-href-decoration">
                <div className="normal-alternative">
                  <div class="material-icons-outlined icon-normal-alternative alternative-icon-buy icon-dashboard">shopping_bag</div>
                  <div className="title-norma-alternative alternative-title-buy icon-dashboard"> Compras</div>
                </div>
              </Link>

              <hr/>

              <Link to={"/client_dashboard/favorites"} className="no-href-decoration">
                <div className="normal-alternative">
                  <div class="material-icons-outlined icon-normal-alternative alternative-icon-favorite icon-dashboard">volunteer_activism</div>
                  <div className="title-norma-alternative active-favorite alternative-title-favorite icon-dashboard"> Favoritos</div>
                </div>
              </Link>

              <hr/>

              <Link to={"/client_dashboard/user-profile"} className="no-href-decoration">
                <div className="normal-alternative">
                  <div class="material-icons-outlined icon-normal-alternative alternative-icon-manage icon-dashboard">manage_accounts</div>
                  <div className="title-norma-alternative icon-dashboard alternative-title-manage"> Meus dados pessoais</div>
                </div>
              </Link>              

              <div className="alternative-dashboard fixed-alternative">Configurações</div>

              <div className="normal-alternative">
                <div class="material-icons-outlined icon-normal-alternative">support</div>
                <div className="title-norma-alternative"> Suporte</div>
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
              <h5 className="text-white w-100">{configs.TitleTwo} </h5>
              <div className="text-end w-100">
                <a href="/" onClick={() => localStorage.removeItem('id')}>
                  <button className="btn btn-outline-danger me-4">Sair</button>
                </a>
              </div>
            </div>

            <Child_component hooks={{configs, setConfigs}} />

          </div>
        </div>
      </div>
	)
}