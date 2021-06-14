import React, { useEffect, useState } from 'react'
import './S-Header.css'
import { Link } from 'react-router-dom'
import Modal from './Modal-Login'
import LogoTipo from './logo-example.png'

function Header() {
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
              <span className="material-icons-outlined icon-user" aria-current="page" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                person
              </span>
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
                <Link to={`/search/`+`${search}`} className="search-header-href">
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

                <li className="nav-item item-page-favorites">
                  <abbr title="Favoritos">
                    <a className="nav-link active icon-favorite-href" aria-current="page" href="/admin">
                      <span className="material-icons">
                        favorite_border
                      </span>
                    </a>
                  </abbr>
                </li>

                <li className="nav-item item-desktop">

                  <a className="nav-link active d-flex flex-row " aria-current="page" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <div>
                      <span className="material-icons-outlined icon-user">
                        person
                      </span>
                    </div>
                    <div className="my-account">
                      <small className="login-small">Olá, faça login!</small>
                      <div className="">Minha Conta</div>
                    </div>
                  </a>
                </li>

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
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-secondary">
          <div className="container-fluid">

            <div className="dropdown category">
              <div className="dropdown-toggle color-hover" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="material-icons-outlined">widgets</span> <span>Categorias</span>
              </div>
              <ul className="dropdown-menu active-hover" aria-labelledby="dropdownMenu2">
                <li><button className="dropdown-item" type="button">Action</button></li>
                <li><button className="dropdown-item" type="button">Another action</button></li>
                <li><button className="dropdown-item" type="button">Something else here</button></li>
              </ul>
            </div>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item ms-3">
                  <Link className="nav-link active color-hover" aria-current="page" to="/">Home</Link>
                </li>

                <li className="nav-item ms-2">
                  <a className="nav-link active color-hover" aria-current="page" href="/admin">Ofertas do dia</a>
                </li>

                <li className="nav-item ms-2">
                  <a className="nav-link active color-hover" aria-current="page" href="/admin">Mais vendidos</a>
                </li>

                <li className="nav-item ms-2">
                  <a className="nav-link active color-hover" aria-current="page" href="/admin">Contato</a>
                </li>

                <li className="nav-item ms-2">
                  <Link to="/admin/dashboard" className="nav-link active color-hover">Dashboard (admin)</Link>
                </li>

              </ul>

            </div>
          </div>
        </nav>

        {/*
          Modal aqui a baixo
        */}
        <Modal/>
        {/*
          Modal aqui a cima
          */}

      </header>
    </>
  )
}



export default Header
