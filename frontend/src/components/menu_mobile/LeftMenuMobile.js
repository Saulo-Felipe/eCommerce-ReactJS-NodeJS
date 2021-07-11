import React from 'react'
import { Link } from 'react-router-dom'


export default function LeftMenuMobile() {

  window.addEventListener('load', () => {
    var MobileLeftMenu = document.querySelector('.LeftSearch-favorite')


      document.querySelector('.active-menu-mobile-left').addEventListener('click', () => {
        MobileLeftMenu.style.left = "0%"
        document.querySelector('body').style.overflow = "hidden"
      })

      document.querySelector('.material-icons-outlined').addEventListener('click', () => {
        MobileLeftMenu.style.left = "-110%"
        document.querySelector('body').style.overflow = "scroll"
      })

  })

	return (
    
    <div className="LeftSearch-favorite ms-5 menu-dashboard-client-header">
      <div className="material-icons-outlined close-menu-filter-search text-end w-100 pe-1 mt-2">close</div>

      <div className="d-flex header-top-favorite">
        <div className="border-on-image-profile-favorite ">
          <div className="favorite-perfil-photo" style={{backgroundImage: `url(${require(`../../coversProduct/teste.jpg`).default})`}}>

          </div>
        </div>

        <div className="informations-favorite-page">
          <div className="favorite-name">Jubileu Amarelo</div>
          <div className="favorite-email">jubileuAmarelo@gmail.com</div>
        </div>
      </div>
      
      <div className="content-favorite-left mt-5">
        <div className="alternative-dashboard fixed-alternative">Dashboard</div>


        <Link to={"/client_dashboard/Compras"} className="no-href-decoration">
          <div className="normal-alternative">
            <div className="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">shopping_bag</div>
            <div className="title-norma-alternative title-buy icon-dashboard"> Compras</div>
          </div>
        </Link>

        <hr/>

        <Link to={"/client_dashboard/favorites"} className="no-href-decoration">
          <div className="normal-alternative">
            <div className="material-icons-outlined icon-normal-alternative icon-favorite icon-dashboard">volunteer_activism</div>
            <div className="title-norma-alternative active-favorite title-favorite icon-dashboard"> Favoritos</div>
          </div>
        </Link>

        <hr/>

        <Link to={"/client_dashboard/user-profile"} className="no-href-decoration">
          <div className="normal-alternative">
            <div className="material-icons-outlined icon-normal-alternative">manage_accounts</div>
            <div className="title-norma-alternative"> Meus dados pessoais</div>
          </div>        
        </Link>

        <div className="alternative-dashboard fixed-alternative">Configurações</div>

        <div className="normal-alternative">
          <div className="material-icons-outlined icon-normal-alternative">support</div>
          <div className="title-norma-alternative"> Suporte</div>
        </div>

        <hr/>

        <div className="normal-alternative">
          <div className="material-icons-outlined icon-normal-alternative">location_on</div>
          <div className="title-norma-alternative"> Endereços</div>
        </div>

        <hr/>

        <div className="normal-alternative">
          <div className="material-icons-outlined icon-normal-alternative">credit_card</div>
          <div className="title-norma-alternative"> Metodos de pagamento</div>
        </div>


      </div>
    </div>
	)
}