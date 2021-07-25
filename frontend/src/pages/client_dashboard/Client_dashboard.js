import React, { useState, useEffect } from 'react'
import './S-Client_dashboard.css'
import {Link} from 'react-router-dom'

import Favorite from './favorites/Favorite'
import Purchases from './purchases/Purchases'
import UserProfile from './configs/User_Configs'

import {isAuthenticated} from '../../services/isAuthenticated'
import api from '../../services/api'

import {useProfilePhoto} from '../../components/context/ProfilePhoto'

export default function ClientDashboard(props) {

  const [configs, setConfigs] = useState({ PagePosition: '', TitleOne: '', TitleTwo: '' })
  const [userInformations, setUserInformations] = useState({profileImage: '', email: ''})
  const [saveEditImage, setSaveEditImage] = useState()
  const { profilePhoto, setProfilePhoto } = useProfilePhoto()

  var ChildComponent
  if (props.ChildComponent === "Favorite") ChildComponent = Favorite
  else if (props.ChildComponent === "Purchases") ChildComponent = Purchases
  else if (props.ChildComponent === "UserProfile") ChildComponent = UserProfile
  else alert('ok')

  useEffect(() => {

    (async () => {
      var isLogged = await isAuthenticated()

      if (isLogged.data && isLogged.data.error) return alert('Erro ao listar dados de usuario!')

      setUserInformations({
        user_name: isLogged.user_name,
        profileImage: isLogged.profile_photo,
        email: isLogged.email,
        id: isLogged.id
      })
    })();
  }, [])

  async function ChangeProfilePhoto(file) {
    console.log('entrei')
    var preview = URL.createObjectURL(file)
    console.log('preview: ', preview)
    setProfilePhoto(`${preview}`)
    setSaveEditImage(<div className="container-btn-save-or-remove-image d-flex" onClick={() => saveChanges(file)}><button className="btn btn-secondary me-2" onClick={() => discardChanges()}>Descartar alterações</button><button className="btn btn-success">Salvar</button></div>)
  }

  async function saveChanges(file) {
    var isLogged = await isAuthenticated()

    var formData = new FormData()

    formData.append('id', isLogged.id)
    formData.append('image-profile', file)

    var response = await api.post('/change-profile-photo', formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    })

    if (response.data.error) return alert('Error encontrado')

    setSaveEditImage("")
  }

  async function discardChanges() {
    setProfilePhoto(`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${userInformations.profileImage || "user.png"}/${userInformations.id}/profile`)
    setSaveEditImage("")
    document.querySelector('#change-photo-profile-input').value = ""
  }



  return (
      <div className="SearchPage favorite-page pb-5">
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
              <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> {configs.PagePosition}
            </div>
          </div>
        </div>


        <div className="ContentSearch d-flex flex-box">
          <div className="LeftSearch-favorite ms-5 menu-dashboard-client">
            <div className="material-icons-outlined close-menu-filter-search text-end w-100 pe-1 mt-2">close</div>

            <div className="d-flex header-top-favorite">
              <div className="border-on-image-profile-favorite ">
                <input autoComplete="off" type="file" id="change-photo-profile-input" className="d-none" onChange={(change) => ChangeProfilePhoto(change.target.files[0])}/>
                <label htmlFor="change-photo-profile-input">
                  <div className="changePhoto-client">
                    <div>Clique para alterar foto</div>
                  </div>
                </label>
                <div className="favorite-perfil-photo" style={{backgroundImage: `url(${profilePhoto}`}}></div>
              </div>

              <div className="informations-favorite-page">
                <div className="favorite-name">{userInformations.user_name}</div>
                <div className="favorite-email">{userInformations.email}</div>
              </div>
            </div>
            {saveEditImage}
            
            <div className="content-favorite-left mt-5">
              <div className="alternative-dashboard fixed-alternative">Dashboard</div>

              {/*=================| Alternatives Menu |===================*/}

              <Link to={"/client_dashboard/Compras"} className="no-href-decoration">
                <div className="normal-alternative">
                  <div className="material-icons-outlined icon-normal-alternative alternative-icon-buy icon-dashboard">shopping_bag</div>
                  <div className="title-norma-alternative alternative-title-buy icon-dashboard"> Compras</div>
                </div>
              </Link>

              <hr/>

              <Link to={"/client_dashboard/favorites"} className="no-href-decoration">
                <div className="normal-alternative">
                  <div className="material-icons-outlined icon-normal-alternative alternative-icon-favorite icon-dashboard">volunteer_activism</div>
                  <div className="title-norma-alternative active-favorite alternative-title-favorite icon-dashboard"> Favoritos</div>
                </div>
              </Link>

              <hr/>

              <Link to={"/client_dashboard/user-profile"} className="no-href-decoration">
                <div className="normal-alternative">
                  <div className="material-icons-outlined icon-normal-alternative alternative-icon-manage icon-dashboard">manage_accounts</div>
                  <div className="title-norma-alternative icon-dashboard alternative-title-manage"> Meus dados pessoais</div>
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

              {/*=================| Alternatives Menu |===================*/}

            </div>
          </div>

          <div className="container search-content-container">
            <div className="FilterTop d-flex">
              <h5 className="text-white w-100 position-absolute">{configs.TitleTwo} </h5>
              <div className="text-end w-100">
                <a href="/" onClick={() => localStorage.removeItem('id')}>
                  <button className="btn btn-outline-danger me-4">Sair</button>
                </a>
              </div>
            </div>

            <ChildComponent hooks={{configs, setConfigs}} />

          </div>
        </div>
      </div>
	)
}