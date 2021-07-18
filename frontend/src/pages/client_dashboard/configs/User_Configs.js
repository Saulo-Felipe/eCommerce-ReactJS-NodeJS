import React, { useEffect, useState } from 'react'
import './S-User_Profile.css'
import api from '../../../services/api'
import { isAuthenticated } from '../../../services/isAuthenticated'


export default function UserProfile(props) {

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
	const [errors, setError] = useState()

	
	useEffect(() => {

	    props.hooks.setConfigs({
	      PagePosigion: 'Configurações',
	      TitleOne: 'Minha Conta',
	      TitleTwo: 'Edite suas informações aqui: '
	    });

		(async () => {
			var isLogged = await isAuthenticated()
			var response = await api.post('/profile', { id: isLogged.id })
			setInformations(response.data.result)
			if (response.data.error) return alert(response.data.error)

			//Adress
			var resp = await api.post('/get-adress', { id: isLogged.id })
			if (resp.data.error) return alert(resp.data.error)

			var adress = resp.data.result
			setEditAdress({
				street: adress.street,
				house_number: adress.house_number,
				district: adress.district,
				country: adress.country,
				cep: adress.cep,
				city: adress.city,
				state: adress.state
			})
		})();

	    // ==========| Active color on actual page |==========
	    var icons = document.querySelectorAll('.icon-dashboard')
	    for (var c=0; c < icons.length; c++) {
	      icons[c].classList.remove('active-here')
	    }
	    document.querySelector('.alternative-icon-manage').classList.add('active-here')
	    document.querySelector('.alternative-title-manage').classList.add('active-here');
	    // ==========| Active color on actual page |==========

	}, [])

	async function saveChages() {
		var isLogged = await isAuthenticated()

		var user_name = document.querySelector('#user_name').value === "" ? "0" : document.querySelector('#user_name').value
		var user_email = document.querySelector('#user_email').value === "" ? "0" : document.querySelector('#user_email').value 
		var user_number = document.querySelector('#phone_number').value === "" ? "0" : document.querySelector('#phone_number').value.replace(/[() -]/g, '')
		var user_cpf = document.querySelector('#user_cpf').value === "" ? "0" : document.querySelector('#user_cpf').value.replace(/[. -]/g, '')

		var street = document.querySelector('#street').value === "" ? "0" : document.querySelector('#street').value
		var district = document.querySelector('#district').value === "" ? "0" : document.querySelector('#district').value
		var city = document.querySelector('#city').value === "" ? "0" : document.querySelector('#city').value
		var state = document.querySelector('#state').value === "" ? "0" : document.querySelector('#state').value
		var country = document.querySelector('#country').value === "" ? "0" : document.querySelector('#country').value
		var cep = document.querySelector('#cep').value === "" ? "0" : document.querySelector('#cep').value.replace(/[-]/g, '')
		var house_number = document.querySelector('#house_number').value === "" ? "0" : document.querySelector('#house_number').value



		if (
			user_name.length === 0 || user_email.length === 0 || user_number.length === 0 || user_cpf === 0
			|| street.length === 0 || district.length === 0 || city.length === 0 || state.length === 0 || 
			country.length === 0 || cep.length === 0 || house_number.length === 0
			) {
				return setError("Por favor, preencha todos os campos para salvar.")
			}
		
		document.querySelector('.close-modal-configs-user').click()

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
			id: isLogged.id, 
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
			value = value.replace(/[^0-9.-]+/g, '')
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

			value = value.replace(/[^0-9()-]+/g, '')
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
				value = value.lastIndexOf("-") !== -1 && value.length < 5 && value.length > 5 ? value.substr(0, value.lastIndexOf("-")) : value

			value = value.replace(/[^0-9/-]+/g, '')
			value = value.replace('--', '')
		} else value = value.substr(0, 9)

		cep.value = value
	}
	
	return (
		<div className="profile">
			<div className="container">

				<div className="Secondary-container-profile">

					<div className="d-flex p-3 ps-0 row-user-configs">
						<h6 className="w-50">Nome Completo: </h6>
						<div className="w-50 one-info-userProfile">{informations.user_name}</div>
					</div>

					<hr/>

					<div className="d-flex p-3 ps-0 row-user-configs">
						<h6 className="w-50">Email: </h6>
						<div className="w-50 one-info-userProfile">{informations.email}</div>
					</div>

					<hr/>

					<div className="d-flex p-3 ps-0 row-user-configs">
						<h6 className="w-50">Telefone: </h6>
						<div className="w-50 one-info-userProfile">{informations.phone === "0" ? "Nenhum número de celular cadastrado" : informations.phone}</div>
					</div>

					<hr/>

					<div className="d-flex p-3 ps-0 row-user-configs">
						<h6 className="w-50">CPF: </h6>
						<div className="w-50 one-info-userProfile">{informations.cpf === "0" ? "Nenhum CPF cadastrado" : informations.cpf}</div>
					</div>

					<hr/>

					<div className="d-flex p-3 ps-0 row-user-configs">
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
					  <div className="text-center text-danger">{errors}</div>
				      <div class="modal-body profile-edit-modal-body">
				        
						<div className="d-flex p-3 background-blue-transparent row-user-configs">
							<h6 className="w-50 profile-title-information">Nome Completo: </h6>
							<input autoComplete="off" type="text" className="w-50 form-control input-mobile-width" id="user_name" defaultValue={informations.user_name}/>
						</div>

						<div className="d-flex p-3 row-user-configs">
							<h6 className="w-50 profile-title-information">Email: </h6>
							<input autoComplete="off" type="text" className="w-50 form-control input-mobile-width" defaultValue={informations.email} id="user_email" />
						</div>

						<div className="d-flex p-3 background-blue-transparent row-user-configs">
							<h6 className="w-50 profile-title-information">Telefone: </h6>
							<input autoComplete="off" type="text" className="w-50 form-control input-mobile-width" id="phone_number" maxlength="14" placeholder="(86) 99112-5544" onChange={(changes) => {phone(changes.target.value)}} defaultValue={informations.phone === "0" ? "" : informations.phone}/>
						</div>

						<div className="d-flex p-3 row-user-configs">
							<h6 className="w-50 profile-title-information">CPF: </h6>
							<input autoComplete="off" type="text" className="w-50 form-control input-mobile-width" id="user_cpf" maxlength="14" placeholder="123.456.789-25" onChange={(changes) => {cpf(changes.target.value)}} defaultValue={informations.cpf === "0" ? "" : informations.cpf} />
						</div>

						<hr className="m-3"/>

						<div className="p-3 ps-0">
							<h5 className="text-center mb-2">Endereço </h5>

							<div className="background-blue-transparent p-3">
								<label htmlFor="street">Rua: </label>
								<input autoComplete="off" type="text" id="street" className="form-control mb-3" placeholder="Ex: R. Gonçalvez Filho" defaultValue={EditAdress.street === "0" ? "" : EditAdress.street }/>
							</div>

							<div className="p-3">
								<label htmlFor="district">Bairro: </label>
								<input autoComplete="off" type="text" id="district" className="form-control mb-3" placeholder="Ex: Emboca" defaultValue={EditAdress.district === "0" ? "" : EditAdress.district } />
							</div>

							<div className="background-blue-transparent p-3">
								<label htmlFor="city">Cidade: </label>
								<input autoComplete="off" type="text" id="city" className="form-control mb-3" placeholder="São Paulo" defaultValue={EditAdress.city === "0" ? "" : EditAdress.city }/>
							</div>

							<div className="p-3">
								<label htmlFor="state">Estado: </label>
								<input autoComplete="off" type="text" id="state" className="form-control mb-3" placeholder="Brasilia" defaultValue={EditAdress.state === "0" ? "" : EditAdress.state }/>
							</div>

							<div className="background-blue-transparent p-3">
								<label htmlFor="country">País: </label>
								<input autoComplete="off" type="text" id="country" className="form-control mb-3" placeholder="Brasil" defaultValue={EditAdress.country === "0" ? "" : EditAdress.country }/>
							</div>

							<div className="p-3">
								<label htmlFor="cep">Cep: </label>
								<input autoComplete="off" type="text" id="cep" className="form-control mb-3" onChange={(changes) => {cep(changes.target.value)}} placeholder="11111-000" defaultValue={EditAdress.cep === "0" ? "" : EditAdress.cep }/>
							</div>

							<div className="p-3 background-blue-transparent">
								<label htmlFor="house_number">Numero residencial: </label>
								<input autoComplete="off" type="text" id="house_number" className="form-control mb-3" placeholder="11111-000" defaultValue={EditAdress.house_number === "0" ? "" : EditAdress.house_number }/>
							</div>									
						</div>

				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-secondary close-modal-configs-user" data-bs-dismiss="modal">Cancelar</button>
				        <button type="button" class="btn btn-primary" onClick={saveChages}>Salvar Alterações</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		</div>
	)
}