import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './S-LeftMenuMobile.css'
import { isAuthenticated } from '../../services/isAuthenticated'
import api from '../../services/api'
import { useProfilePhoto } from '../context/ProfilePhoto'

import { useSelector } from 'react-redux'
import { selectLike } from '../../store/slices/likeSlice'

export default function LeftMenuMobile() {

  const [mobile, setMobile] = useState(false)
  const [search, setSearch] = useState()
  const [isLogged, setIsLogged] = useState(null)
  const { profilePhoto, setProfilePhoto } = useProfilePhoto()
  const [isSave, setIsSave] = useState()

  const { likeCount } = useSelector(selectLike)

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
          if (document.querySelector('.confirm-new-photo') === null) {
            MobileLeftMenu.style.left = "-110%"
            document.querySelector('body').style.overflow = "scroll"
          } else {
            var save = window.confirm('Deseja salvar as alterações?')
            if (save === true) {
              document.querySelector('.confirm-new-photo').click()
            } else {
              document.querySelector('.cancel-new-photo').click()
            }
          }
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

  function configsImageMobile() {
    console.log(isSave)
    var icon = document.querySelector('.edit-photo-icon')
    var menu = document.querySelector('.dropdown-configs-photo')

    if (getComputedStyle(menu, null).display === "block") {
      icon.style.transform = "translate(-100%, -100%) rotate(0deg)"
      menu.style.display = "none"
    } else {
      icon.style.transform = "translate(-100%, -100%) rotate(45deg)"
      menu.style.display = "block"
    }
  }

  async function previewPhotoChange(file) {
    var preview = URL.createObjectURL(file)
    setProfilePhoto(`${preview}`)

    setIsSave(
      <div className="d-flex justify-content-center">
        <button className="btn-small-modify btn-primary me-2 confirm-new-photo" onClick={() => submitNewPhoto(file)}>Salvar Alterações</button>
        <button className="btn-small-modify btn-secondary cancel-new-photo" onClick={cancelNewPhoto}>Cancelar</button>
      </div>
    )
  }

  async function submitNewPhoto(file) {
    var formData = new FormData()

    formData.append('id', isLogged.id)
    formData.append('image-profile', file)

    setIsSave()
    var response = await api.post('/change-profile-photo', formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    })
    
    if (response.data.error) return alert('Erro ao alterar foto de perfil')
  } 

  function cancelNewPhoto() {
    console.log(isLogged)
    setProfilePhoto(`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${isLogged.profile_photo || "user.png"}/${isLogged.id}/profile`)
    setIsSave()

    document.querySelector('#photo-edit').value = ""
  }

  async function logout() {
    localStorage.removeItem('token_login')
    return window.location.href = "/"
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
                      <i class="fas fa-cog edit-photo-icon" onClick={configsImageMobile}></i>
                      <div className="favorite-perfil-photo" style={{backgroundImage: `url(${profilePhoto})`}}></div>
                      <div className="dropdown-configs-photo">
                        <label for="photo-edit"><div onClick={configsImageMobile}>Alterar Foto de perfil</div></label>
                        <input type="file" id="photo-edit" className="d-none" onChange={(change) => previewPhotoChange(change.target.files[0])}/>
                      </div>                      
                    </div>

                    <div className="informations-favorite-page">
                      <div className="favorite-name">Jubileu Amarelo</div>
                      <div className="favorite-email">jubileuAmarelo@gmail.com</div>
                    </div>

                  </div>
                  {isSave}
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

              <div className="alternative-dashboard w-100 fixed-alternative border-bottom"  data-bs-toggle="collapse" data-bs-target="#other-alternatives-menu-mobile" aria-expanded="false" aria-controls="other-alternatives-menu-mobile">
                Home <i className="fas fa-caret-down"></i>
              </div>
              <div className="collapse" id="other-alternatives-menu-mobile">

                <Link to={"/"} className="no-href-decoration ALL_close-menu-mobile">
                  <div className="normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">home</div>
                    <div className="title-norma-alternative title-buy icon-dashboard"> Home</div>
                  </div>
                </Link>

                <Link className="no-href-decoration ALL_close-menu-mobile" data-bs-toggle="modal" data-bs-target="#developmentPage">
                  <div className="d-flex normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">dashboard</div>
                    <div className="ps-2 title-norma-alternative title-buy icon-dashboard"> Categorias</div>
                    <div className="notify-all-types"><div>BETA</div></div>
                  </div>
                </Link>


                <Link className="no-href-decoration ALL_close-menu-mobile" data-bs-toggle="modal" data-bs-target="#developmentPage">
                  <div className="d-flex normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">local_offer</div>
                    <div className="ps-2 title-norma-alternative title-buy icon-dashboard"> Ofertas do Dia</div>
                    <div className="notify-all-types"><div>BETA</div></div>
                  </div>
                </Link>

                <Link className="no-href-decoration ALL_close-menu-mobile" data-bs-toggle="modal" data-bs-target="#developmentPage">
                  <div className="d-flex normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">credit_score</div>
                    <div className="ps-2 title-norma-alternative title-buy icon-dashboard"> Mais vendidos</div>
                    <div className="notify-all-types"><div>BETA</div></div>
                  </div>
                </Link>

                <Link className="no-href-decoration ALL_close-menu-mobile" onClick={() => window.scrollTo(0, 10000) }>
                  <div className="normal-alternative">
                    <div className="material-icons-outlined icon-normal-alternative icon-buy icon-dashboard">alternate_email</div>
                    <div className="title-norma-alternative title-buy icon-dashboard"> Contato</div>
                  </div>
                </Link>
              </div>

              <div className="alternative-dashboard w-100 fixed-alternative border-bottom"  data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false" aria-controls="dashboard-collapse">
                Dashboard <i className="fas fa-caret-down"></i>
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
                      <div className="like-amount-notify"><div>{likeCount}</div></div>
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


              <div className="alternative-dashboard w-100 fixed-alternative border-bottom"  data-bs-toggle="collapse" data-bs-target="#configs-collapse" aria-expanded="false" aria-controls="configs-collapse">
                Configurações <i className="fas fa-caret-down"></i>
              </div>

              <div className="collapse show" id="configs-collapse">
                <div className="normal-alternative">
                  <div className="material-icons-outlined icon-normal-alternative">support</div>
                  <div className="title-norma-alternative"> Suporte</div>
                </div>

                <hr/>

                <div className="normal-alternative ALL_close-menu-mobile">
                  <div className="material-icons-outlined icon-normal-alternative">location_on</div>
                  <div className="title-norma-alternative " data-bs-toggle="modal" data-bs-target="#launchCityModal"> Endereços</div>
                </div>

                <hr/>

                <div className="normal-alternative">
                  <div className="material-icons-outlined icon-normal-alternative">credit_card</div>
                  <div className="title-norma-alternative" onClick={() => window.scrollTo(0, 10000)}> Metodos de pagamento</div>
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
      <div class="modal fade" id="launchCityModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Onde fica nossos estabelecimentos?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2729.864847736827!2d-35.6093926234757!3d-7.289857627584452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac147d221306db%3A0x6eec50140f93f949!2sPrefeitura%20Municipal%20de%20Ing%C3%A1!5e0!3m2!1spt-BR!2sbr!4v1629478517273!5m2!1spt-BR!2sbr" width="100%" height="450" style={{border: '0'}} allowfullscreen="" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
      
    </>

	)
}