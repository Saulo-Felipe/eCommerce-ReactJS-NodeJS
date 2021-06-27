import React, { useEffect, useState } from 'react'
import './S-UserProfile.css'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import temporaryProfileImg from './change-photo.png'

export default function UserProfile() {

	const [saveImageProfile, setSaveProfileImage] = useState()
	const [imageRequire, setImageRequire] = useState()
	const [informations, setInformations] = useState({})
	const [EditAdress, setEditAdress] = useState({
		street: '',
		house_number: '',
		district: '',
		country: '',
		cep: '',
		city: '',
		state: '',
	})

	const {id} = useParams()
	
	useEffect(() => {
		(async () => {
			var response = await api.post('/profile', { id })
			setImageRequire(<img src={require(`./profile-images/${response.data.result.profile_photo}`).default} alt="Profile image" id="image-profile" />)
			setInformations(response.data.result)
			if (response.data.error) alert(response.data.error)

			//Adress
			var response = await api.post('/get-adress', { id })
			if (response.data.error) alert(response.data.error)

			var adress = response.data.result
			setEditAdress({
				street: adress.street,
				house_number: adress.house_number,
				district: adress.district,
				country: adress.country,
				cep: adress.cep,
				city: adress.city,
				state: adress.state
			})

		})()
	}, [])

	async function refreshProfileImage (image) {
		var formData = new FormData

		formData.append('image-profile', image)
		formData.append('id', id)
		var response = await api.post('/change-profile-photo', formData, {
			headers: {
				'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
			}
		})
		if (response.data.error) alert(response.data.error)

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

	async function saveChages() {
		var user_name = document.querySelector('#user_name').value
		var user_email = document.querySelector('#user_email').value
		var user_number = document.querySelector('#phone_number').value.replace(/[() -]/g, '')
		var user_cpf = document.querySelector('#user_cpf').value.replace(/[\. -]/g, '')


		var street = document.querySelector('#street').value
		var district = document.querySelector('#district').value
		var city = document.querySelector('#city').value
		var state = document.querySelector('#state').value
		var country = document.querySelector('#country').value
		var cep = document.querySelector('#cep').value.replace(/[-]/g, '')
		var house_number = document.querySelector('#house_number').value


		setEditAdress({
			street: street,
			house_number: house_number,
			district: district,
			country: country,
			cep: cep,
			city: city,
			state: state
		})
		setInformations({user_name: user_name, 
			email: user_email, 
			phone: user_number, 
			cpf: user_cpf
		})

		var response = await api.post('/edit/profile', { 
			id, 
			user_name: user_name, 
			email: user_email,
			phone: user_number,
			cpf: user_cpf,

			street: street,
			district: district,
			city: city,
			state: state,
			country: country,
			cep: cep,
			house_number: house_number
		})
		if (response.data.error) alert(response.data.error)
	}

	function cpf(v){
		var cpf = document.querySelector('#user_cpf')
		var value = v

		if (value.length <= 14) {
			if (value.length === 3) value+='.'
			else if (value.length === 7) value+='.' 
			else if (value.length === 11) value+='-'
			value = value.replace(/[^0-9\.-]+/g, '')
			value = value.replace('..', '')
			value = value.replace('--', '')
		} else value.substr(0, 14)
		
		cpf.value = value
	}
	function phone(v) {
		var phone = document.querySelector('#phone_number')
		var value = v

		if (value.length <= 14) {
			if (value.length === 1) value = "(" + value
			else if (value.length === 3) value += ") "
			else if (value.length === 9) value += "-"

			value = value.replace(/[^0-9\()-]+/g, '')
			value = value.replace('((', '(')
			value = value.replace('))', ')')
			value = value.replace('--', '-')
		} else value = value.substr(0, 14)

		phone.value = value
	}
	function cep(v) {
		var cep = document.querySelector('#cep')
		var value = v

		if (value.length <= 9) {
			if (value.length === 5) value += "-"
			else
				value = value.lastIndexOf("-") != -1 && value.length < 5 && value.length > 5 ? value.substr(0, value.lastIndexOf("-")) : value

			value = value.replace(/[^0-9\-]+/g, '')
			value = value.replace('--', '')
		} else value = value.substr(0, 9)

		cep.value = value
	}


	//Mask values on inputs
	useEffect(() => {

	}, [])
	
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
						<div className="w-50 one-info-userProfile">{informations.phone === "0" ? "Nenhum número de celular cadastrado" : informations.phone}</div>
					</div>

					<hr/>

					<div className="d-flex p-3 ps-0">
						<h6 className="w-50">CPF: </h6>
						<div className="w-50 one-info-userProfile">{informations.cpf === "0" ? "Nenhum CPF cadastrado" : informations.cpf}</div>
					</div>

					<hr/>

					<div className="d-flex p-3 ps-0">
						<h6 className="w-50">Endereço: </h6>
						<div className="w-50 one-info-userProfile">{`${EditAdress.city} R. ${EditAdress.street} - ${EditAdress.house_number}, ${EditAdress.district}, ${EditAdress.state} ${EditAdress.country} - ${EditAdress.cep}`}</div>
					</div>

					<hr/>

					<button className="btn btn-success mt-4" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
				</div>

				<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog body-modal-profile">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Atualize suas informações pessoais</h5>
				        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				      </div>
				      <div class="modal-body profile-edit-modal-body">
				        
								<div className="d-flex p-3 background-blue-transparent">
									<h6 className="w-50 profile-title-information">Nome Completo: </h6>
									<input type="text" className="w-50 form-control" id="user_name" defaultValue={informations.user_name}/>
								</div>

								<div className="d-flex p-3">
									<h6 className="w-50 profile-title-information">Email: </h6>
									<input type="text" className="w-50 form-control" defaultValue={informations.email} id="user_email" />
								</div>

								<div className="d-flex p-3 background-blue-transparent">
									<h6 className="w-50 profile-title-information">Telefone: </h6>
									<input type="text" className="w-50 form-control" id="phone_number" maxlength="14" placeholder="(86) 99112-5544" onChange={(changes) => {phone(changes.target.value)}} defaultValue={informations.phone === "0" ? "Nenhum número de celular cadastrado" : informations.phone}/>
								</div>

								<div className="d-flex p-3">
									<h6 className="w-50 profile-title-information">CPF: </h6>
									<input type="text" className="w-50  form-control" id="user_cpf" maxlength="14" placeholder="123.456.789-25" onChange={(changes) => {cpf(changes.target.value)}} defaultValue={informations.cpf === "0" ? "Nenhum cpf Cadastrado" : informations.cpf} />
								</div>

								<hr className="m-3"/>

								<div className="p-3 ps-0">
									<h5 className="text-center mb-2">Endereço </h5>

									<div className="background-blue-transparent p-3">
										<label htmlFor="street">Rua: </label>
										<input type="text" id="street" className="form-control mb-3" placeholder="Ex: R. Gonçalvez Filho" defaultValue={EditAdress.street === "0" ? "Nenhum endereço cadastrado nesse campo." : ""}/>
									</div>

									<div className="p-3">
										<label htmlFor="district">Bairro: </label>
										<input type="text" id="district" className="form-control mb-3" placeholder="Ex: Emboca" defaultValue={EditAdress.district === "0" ? "Nenhum endereço cadastrado nesse campo." : ""} />
									</div>

									<div className="background-blue-transparent p-3">
										<label htmlFor="city">Cidade: </label>
										<input type="text" id="city" className="form-control mb-3" placeholder="São Paulo" defaultValue={EditAdress.city === "0" ? "Nenhum endereço cadastrado nesse campo." : ""}/>
									</div>

									<div className="p-3">
										<label htmlFor="state">Estado: </label>
										<input type="text" id="state" className="form-control mb-3" placeholder="Brasilia" defaultValue={EditAdress.state === "0" ? "Nenhum endereço cadastrado nesse campo." : ""}/>
									</div>

									<div className="background-blue-transparent p-3">
										<label htmlFor="country">País: </label>
										<input type="text" id="country" className="form-control mb-3" placeholder="Brasil" defaultValue={EditAdress.country === "0" ? "Nenhum endereço cadastrado nesse campo." : ""}/>
									</div>

									<div className="p-3">
										<label htmlFor="cep">Cep: </label>
										<input type="text" id="cep" className="form-control mb-3" onChange={(changes) => {cep(changes.target.value)}} placeholder="11111-000" defaultValue={EditAdress.cep === "0" ? "Nenhum endereço cadastrado nesse campo." : ""}/>
									</div>

									<div className="p-3 background-blue-transparent">
										<label htmlFor="house_number">Numero residencial: </label>
										<input type="text" id="house_number" className="form-control mb-3" placeholder="11111-000" defaultValue={EditAdress.house_number === "0" ? "Nenhum endereço cadastrado nesse campo." : ""}/>
									</div>									
								</div>

				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
				        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={saveChages}>Salvar Alterações</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		</div>
	)
}