import React, { useEffect, useState } from 'react'
import './S-Header.css'
import { Link } from 'react-router-dom'
import { Modal } from '../../pages/login/Login'
import LogoTipo from './logo-example.png'
import { isAuthenticated } from '../../services/isAuthenticated'
import api from '../../services/api'
import SubHeader from './SubHeader'
import { useLike } from '../context/Likes'

function Header() {
  const { setLike, like } = useLike()

  const [user, setUserName] = useState()
  const [profile_photo, setProfilePhoto] = useState()

  useEffect(() => {
    var input = document.querySelector('.input-search')

    input.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) document.querySelector('.search-header-href').click()
    })

    // Verificar focus do input de pesquisa
    input.addEventListener('focus', () => {
      document.querySelector('.submit-search').style.borderColor = "gray"
    })
    input.addEventListener('blur', () => {
      document.querySelector('.submit-search').style.borderColor = "#ced4da"
    })

    if (window.matchMedia('(min-width: 991px)').matches) {

      var primaryNavbar = document.querySelector('.primary-navbar')
      var secondaryNavbar = document.querySelector('.navbar-secondary')
      var menuBar = document.querySelector('.menuBar-desktop')
      var body = document.querySelector('body')

      document.addEventListener('scroll', () => {
        if (window.scrollY >= 300) {
          menuBar.style.display = 'list-item'
          primaryNavbar.classList.add('fixed-top')
          body.style.paddingTop = `${ primaryNavbar.getBoundingClientRect().height }px`

        } else {
          menuBar.style.display = 'none'
          primaryNavbar.classList.remove('fixed-top')
          body.style.paddingTop = '0px'

          secondaryNavbar.classList.remove('fixed-top')
          secondaryNavbar.style.marginTop = '0px'
        }
      })

      menuBar.addEventListener('click', () => {
        if (secondaryNavbar.classList.contains('fixed-top')) {
          body.style.paddingTop = `${primaryNavbar.getBoundingClientRect().height}px`
          secondaryNavbar.classList.remove('fixed-top')
          secondaryNavbar.style.marginTop = `0px`
        } else {
          body.style.paddingTop = `${primaryNavbar.getBoundingClientRect().height + secondaryNavbar.getBoundingClientRect().height}px`
          secondaryNavbar.classList.add('fixed-top')
          secondaryNavbar.style.marginTop = `${primaryNavbar.getBoundingClientRect().height}px`
        }
      })
    }

    async function getUser() {

      if (isAuthenticated != null) {
        const response = await api.post('/get-user', {type: "header", id: isAuthenticated })
        setUserName(response.data.user_name)
        setProfilePhoto(<img className="header-profile-img" src={require(`../../pages/client_dashboard/configs/profile-images/${response.data.profile_photo}`).default} alt="User Image" width="40" height="40"/>)
      } else {
        setProfilePhoto(<img className="header-profile-img" src={require('../../pages/client_dashboard/configs/profile-images/user.png').default} alt="User Image" width="40" height="40"/>)
      }
    }
    getUser();

    //Get Liked Products
    (async () => {
      if (isAuthenticated != null) {
        const response = await api.post('/likes', { type: "get all likes", id: isAuthenticated })
        if (!response.data.error) {
          setLike(response.data.result.length)
        } else {
          alert(response.data.error)
        }
      }
    })();




  }, [])

  const [search, setSearch] = useState()

  function changedSearch(InputValueSearch) {
    setSearch(InputValueSearch.target.value)
  }

  return (
    <>
      <header>
        <nav className="navbar primary-navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand me-4 ms-3">
              <img src={LogoTipo} alt="Logotipo" width="30" height="24" className="d-inline-block align-text-top" />
              E-Commerce
            </Link>
            <div className="d-flex flex-row item-mobile">
              <div className="" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="material-icons-outlined menu-mobile">
                  menu
                </span>
              </div>
              <div className="navbar-brand active-menu-mobile-left">
                {profile_photo}
              </div>
              <a href="/admin" className="cart-href">
                <span className="quant-cart">24</span>
                <span className="material-icons-outlined cart-mobile">
                  shopping_cart
                </span>
              </a>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="d-flex form-search">
                <input className="form-control input-search" type="search" placeholder="Pesquise por Categorias, produtos e etc..." aria-label="Search" onChange={changedSearch}/>
                <Link to={`/search/${search}`} className="search-header-href">
                  <button className="btn btn-outline-success submit-search">
                    <span className="material-icons">search</span>
                  </button>
                </Link>
              </div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item menuBar-desktop">
                  <abbr title="Menu" className="abbrMenuConfig">
                    <div className="nav-link active icon-favorite-href" aria-current="page" >
                      <span className="material-icons">
                        menu
                      </span>
                    </div>
                  </abbr>
                </li>

                <li className="nav-item item-page-favorites pe-0">
                  <abbr title="Favoritos">
                    <Link to={'/client_dashboard/favorites/'} className="nav-link active icon-favorite-href d-flex no-href-decoration" aria-current="page">
                      <div className="material-icons">favorite_border</div>
                      <div className="header-amountLikes">{like}</div>
                    </Link>
                  </abbr>
                </li>

                {
                  isAuthenticated
                  ? 
                    <li className="nav-item item-desktop dropdown">
                      <div className="nav-link active d-flex flex-row " role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <div>
                          <div className="navbar-brand">
                            {profile_photo}
                          </div>
                        </div>
                        <Link to={`/profile/${isAuthenticated}`} className="toYourProfile">
                          <div className="my-account">
                            <small className="login-small">{ user }</small>
                            <div className="">Minha Conta</div>
                          </div>
                        </Link>
                      </div>

                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><Link class="dropdown-item" to="/client_dashboard/user-profile">Minha Conta</Link></li>
                        <li><Link class="dropdown-item" to="/">Carrinho</Link></li>
                        <li><Link class="dropdown-item" to="/client_dashboard/user-profile">Configurações</Link></li>
                        <li><a class="dropdown-item" href="/" onClick={() => localStorage.removeItem('id')}>Sair</a></li>
                      </ul>
                    </li>
                  :
                   <li className="nav-item item-desktop">
                      <a className="nav-link active d-flex flex-row " aria-current="page" href="/" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <div>
                          <div className="navbar-brand">
                            {profile_photo}
                          </div>
                        </div>
                        <div className="my-account">
                          <small className="login-small">Olá, faça login!</small>
                          <div className="">Minha Conta</div>
                        </div>
                      </a>
                    </li>
                }

                <li className="nav-item dropdown item-desktop">

                  <a className="nav-link active d-flex flex-row" href="/admin" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div>
                      <span className="material-icons-outlined icon-cart">
                        shopping_cart
                      </span>
                    </div>
                    <div className="my-account">
                      <small className="login-small">Meu Carrinho</small>
                      <div className="dropdown-toggle">$299,99</div>
                    </div>
                  </a>

                  <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="/admin">Action</a></li>
                    <li><a className="dropdown-item" href="/admin">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="/admin">Something else here</a></li>
                  </ul>
                </li>

                {/*
                  * Menu Mobile A baixo
                  *
                */}

                <li className="nav-item dropdown item-mobile ps-2 options-menu-mobile">
                  <a className="nav-link active dropdown-toggle" href="/admin" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="material-icons-outlined">widgets</span> <span>Categorias</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-lg-end dropdown-mobile-details" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="/admin">Action</a></li>
                    <li><a className="dropdown-item" href="/admin">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="/admin">Something else here</a></li>
                  </ul>
                </li>

                <li className="nav-item ps-2 item-mobile options-menu-mobile">
                  <a className="nav-link active color-hover" aria-current="page" href="/admin">Home</a>
                </li>

                <li className="nav-item ps-2 item-mobile options-menu-mobile">
                  <a className="nav-link active color-hover" aria-current="page" href="/admin">Ofertas do dia</a>
                </li>

                <li className="nav-item ps-2 item-mobile options-menu-mobile">
                  <a className="nav-link active color-hover" aria-current="page" href="/admin">Mais vendidos</a>
                </li>

                <li className="nav-item ps-2 item-mobile options-menu-mobile">
                  <a className="nav-link active color-hover" aria-current="page" href="/admin">Contato</a>
                </li>
              </ul>

            </div>
          </div>
        </nav>

        <SubHeader isAuthenticated={isAuthenticated}/>

        {/* Modal aqui a baixo */}
        <Modal/>
        {/* Modal aqui a cima */}


      </header>
    </>
  )
}



export default Header
