import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLike } from '../context/Likes'
import './S-LeftMenuMobile.css'
import { isAuthenticated } from '../../services/isAuthenticated'
import api from '../../services/api'
import { useProfilePhoto } from '../context/ProfilePhoto'


export default function LeftMenuMobile() {

  const {like, setLike} = useLike()
  const [mobile, setMobile] = useState(false)
  const [search, setSearch] = useState()
  const [isLogged, setIsLogged] = useState(null)
  const { profilePhoto, setProfilePhoto } = useProfilePhoto()


  function changedSearch(InputValueSearch) {
    setSearch(InputValueSearch.target.value)
  }
  useEffect(() => {

    (async() => {
      setIsLogged(await isAuthenticated())
    })();

    if (window.matchMedia("(max-width: 991px)").matches) {
      window.addEventListener('load', () => {
        var MobileLeftMenu = document.querySelector('.LeftSearch-favorite')
        function removeMenu() {
          MobileLeftMenu.style.left = "-110%"
          document.querySelector('body').style.overflow = "scroll"
        }
        function addMenu() {
          MobileLeftMenu.style.left = "0%"
          document.querySelector('body').style.overflow = "hidden"
        }
        document.querySelector('.close-menu-filter-search').addEventListener('click', () => {
          removeMenu()
        })
        document.querySelector('.menu-mobile').addEventListener('click', () => {
          addMenu()
        })

        var removeMenuMobile = document.querySelectorAll('.ALL_close-menu-mobile')

        for (var c=0; c < removeMenuMobile.length; c++) {
          removeMenuMobile[c].addEventListener('click', () => {
            removeMenu()
          })
        }

      })
    
      setMobile(true)
    }

  }, [])

  async function logout() {
    var response = await api.post('/logout')

    if (response.data.error)
      return alert('Erro ao fazer logout')

    window.location.href = "/"
  }

	return (
    <>
      {
        mobile === true ? <div className="LeftSearch-favorite ms-5 menu-dashboard-client-header">
            <div className="material-icons-outlined close-menu-filter-search text-end w-100 pe-1 mt-2">close</div>
            {
              isLogged === null
              ? 
              <>
                <div className="border-on-image-profile-favorite m-auto">
                  <div className="favorite-perfil-photo" style={{backgroundImage: `url(${profilePhoto})`}}>

                  </div>
                </div>
                <div className="d-flex nav-item ps-2 item-mobile text-primary w-100 mt-4 mb-3">
                  <Link to={"/register"} className="no-href-decoration w-50"><div className="text-center ALL_close-menu-mobile" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">Cadastra-se</div></Link>
                  <div className="w-50 text-center ALL_close-menu-mobile" aria-current="page" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Faça Login</div>
                </div>
                <hr />
              </>
              :
                <>
                  <div className="d-flex header-top-favorite">
                    <div className="border-on-image-profile-favorite ">
                      <div className="favorite-perfil-photo" style={{backgroundImage: `url(${profilePhoto})`}}>

                      </div>
                    </div>

                    <div className="informations-favorite-page">
                      <div className="favorite-name">Jubileu Amarelo</div>
                      <div className="favorite-email">jubileuAmarelo@gmail.com</div>
                    </div>
                  </div>
                </>
            }
            
            <div className="form-search d-flex ps-3 pe-3 mt-4">
              <input autoComplete="off" className="form-control input-search" type="search" placeholder="Pesquise por Categorias, produtos e etc..." aria-label="Search" onChange={changedSearch}/>
              <Link to={`/search/${search}`} className="search-header-href">
                <button className="btn btn-outline-success submit-search ALL_close-menu-mobile">
                  <span className="material-icons">search</span>
                </button>
              </Link>
            </div>

            <div className="content-favorite-left mt-4">

              <div class="alternative-dashboard w-100 fixed-alternative border-bottom"  data-bs-toggle="collapse" data-bs-target="#other-alternatives-menu-mobile" aria-expanded="false" aria-controls="other-alternatives-menu-mobile">
                Home <i class="fas fa-caret-down"></i>
              </div>
              <div class="collapse" id="other-alternatives-menu-mobile">

                <Link to={"/client_dashboard/Compras"} className="no-href-decoration ALL_close-menu-mobile">
                  <div className="normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">home</div>
                    <div className="title-norma-alternative title-buy icon-dashboard"> Home</div>
                  </div>
                </Link>

                <Link to={"/client_dashboard/Compras"} className="no-href-decoration ALL_close-menu-mobile">
                  <div className="normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">dashboard</div>
                    <div className="title-norma-alternative title-buy icon-dashboard"> Categorias</div>
                  </div>
                </Link>


                <Link to={"/client_dashboard/Compras"} className="no-href-decoration ALL_close-menu-mobile">
                  <div className="normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">local_offer</div>
                    <div className="title-norma-alternative title-buy icon-dashboard"> Ofertas do Dia</div>
                  </div>
                </Link>

                <Link to={"/client_dashboard/Compras"} className="no-href-decoration ALL_close-menu-mobile">
                  <div className="normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">credit_score</div>
                    <div className="title-norma-alternative title-buy icon-dashboard"> Mais vendidos</div>
                  </div>
                </Link>

                <Link to={"/client_dashboard/Compras"} className="no-href-decoration ALL_close-menu-mobile">
                  <div className="normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">alternate_email</div>
                    <div className="title-norma-alternative title-buy icon-dashboard"> Contato</div>
                  </div>
                </Link>
              </div>

              <div class="alternative-dashboard w-100 fixed-alternative border-bottom"  data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false" aria-controls="dashboard-collapse">
                Dashboard <i class="fas fa-caret-down"></i>
              </div>
              <div className="collapse show" id="dashboard-collapse">
                <Link to={"/client_dashboard/Compras"} className="no-href-decoration ALL_close-menu-mobile">
                  <div className="normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">shopping_bag</div>
                    <div className="title-norma-alternative title-buy icon-dashboard"> Compras</div>
                  </div>
                </Link>

                <hr/>

                <Link to={"/client_dashboard/favorites"} className="no-href-decoration ALL_close-menu-mobile">
                  <div className="normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative icon-favorite icon-dashboard">volunteer_activism</div>
                    <div className="d-flex title-norma-alternative active-favorite title-favorite icon-dashboard">
                      <div>Favoritos</div>
                      <div className="like-amount-notify"><div>{like}</div></div>
                    </div>
                  </div>
                </Link>

                <hr/>

                <Link to={"/client_dashboard/user-profile"} className="no-href-decoration ALL_close-menu-mobile">
                  <div className="normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative">manage_accounts</div>
                    <div className="title-norma-alternative"> Meus dados pessoais</div>
                  </div>        
                </Link>
              </div>


              <div class="alternative-dashboard w-100 fixed-alternative border-bottom"  data-bs-toggle="collapse" data-bs-target="#configs-collapse" aria-expanded="false" aria-controls="configs-collapse">
                Configurações <i class="fas fa-caret-down"></i>
              </div>

              <div className="collapse show" id="configs-collapse">
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

              {
                isLogged !== null
                 ?
                  <div className="m-4" onClick={() => logout()}>
                    <div className="text-danger me-4">Sair</div>
                  </div>
                :
                ""
              }

              <div className="text-center text-secondary">By Saulo Felipe </div>

            </div>
          </div>
        : ""
      }
    </>

	)
}