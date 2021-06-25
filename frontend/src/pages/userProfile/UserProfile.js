import React, { useEffect, useState } from 'react'
import './S-UserProfile.css'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import temporaryProfileImg from './change-photo.png'

export default function UserProfile() {

	const [saveImageProfile, setSaveProfileImage] = useState()
	const [imageRequire, setImageRequire] = useState()

	var {id} = useParams()
	const [informations, setInformations] = useState({})
	
	useEffect(() => {
		(async () => {
			var response = await api.post('/profile', { id })
			setImageRequire(<img src={require(`./profile-images/${response.data.result.profile_photo}`).default} alt="Profile image" id="image-profile" />)
			setInformations(response.data.result)
		})()
	}, [])

	async function refreshProfileImage (image) {
		var formData = new FormData

		formData.append('image-profile', image)
		formData.append('id', id)
		await api.post('/change-profile-photo', formData, {
			headers: {
				'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
			}
		})
	}

	function changeProfilePhoto(changes) {
		setImageRequire(<img src={`${URL.createObjectURL(changes)}`} alt="Profile image" id="image-profile" />)
		setSaveProfileImage(
			<div className="d-flex mt-2">
				<button className="btn btn-secondary me-2" onClick={() => {setSaveProfileImage(); setImageRequire(<img src={require(`./profile-images/${informations.profile_photo}`).default} alt="Profile image" id="image-profile" />) }}>Descartar alterações</button>
				<button className="btn btn-success" onClick={() => {refreshProfileImage(changes); setSaveProfileImage()}}>Savar alterações</button>
			</div>
		)
	}
	
	return (
		<div className="profile">
			<div className="container">

				<div className="primary-container-profile">
						<label htmlFor="new-profile-image">
							<div className="photo-profile">
								{imageRequire}
								<div className="change-photo-profile"></div>
							</div>
						</label>
					  <input type="file" id="new-profile-image" className="hidden-input" onChange={(changes) => {changeProfilePhoto(changes.target.files[0])}}/>
					<h4 className="text-center mt-3">{informations.user_name}</h4>
					{saveImageProfile}
				</div>

				<div className="Secondary-container-profile">

					<div className="d-flex p-3 ps-0">
						<h6 className="w-50">Nome Completo: </h6>
						<div className="w-50 one-info-userProfile">{informations.user_name}</div>
					</div>

					<hr/>

					<div className="d-flex p-3 ps-0">
						<h6 className="w-50">Email: </h6>
						<div className="w-50 one-info-userProfile">{informations.email}</div>
					</div>

					<hr/>

					<div className="d-flex p-3 ps-0">
						<h6 className="w-50">Telefone: </h6>
						<div className="w-50 one-info-userProfile">{informations.phone === 0 ? "Nenhum número de celular cadastrado" : informations.phone}</div>
					</div>

					<hr/>

					<div className="d-flex p-3 ps-0">
						<h6 className="w-50">CPF: </h6>
						<div className="w-50 one-info-userProfile">{informations.cpf === 0 ? "Nenhum CPF cadastrado" : informations.cpf}</div>
					</div>

					<hr/>

					<div className="d-flex p-3 ps-0">
						<h6 className="w-50">Endereço: </h6>
						<div className="w-50 one-info-userProfile">{informations.cpf}</div>
					</div>


				</div>

			</div>
		</div>
	)
}