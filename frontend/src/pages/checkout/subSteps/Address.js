import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { changeColorsOfSteps } from '../Checkout'
import './S-SubStep.css'
import api from '../../../services/api'
import { isAuthenticated } from '../../../services/isAuthenticated'

import { useSelector, useDispatch } from 'react-redux'
import { changeAddress, selectAddress } from '../../../store/slices/checkoutSlice'


export default function Adress() {

  const dispatch = useDispatch()
  const { address } = useSelector(selectAddress)

  const [defaultInformations, setDefaultInformations] = useState({
    street: '',
		house_number: '',
		district: '',
		country: '',
		cep: '',
		city: '',
		state: '',
    user: '',
    isValid: {status: false, message: ''},
    firstName: '',
    secondName: ''
  })

  useEffect(() => {

    (async() => {
      var isLogged = await isAuthenticated()
			var {data} = await api.post('/get-adress', { id: isLogged.id })
      
      var firstName = isLogged.user_name

      delete isLogged.isAdmin
      delete isLogged.password
      delete isLogged.profile_photo
      delete isLogged.user_name

      var initialState = {...defaultInformations, ...data.result, firstName, user: isLogged}

      console.log(initialState)
      console.log("DATA: ", data.result)

      dispatch(changeAddress(initialState))

      setDefaultInformations(initialState)

    })();

    changeColorsOfSteps(2)
  }, [])

  function inputChanges(input, type) {
    var value = input.value

    if (value.length === 0) {
      input.style.border = "solid 1px red"
    } else {
      input.style.border = "1px solid #ced4da"
    }

    let newValue = {...address}
    newValue[type] = value

    dispatch(changeAddress(newValue))

  }

  function finishStep() {
    var newObject = address

    const allKeys = Object.entries(newObject)
    const userKeys = Object.entries(newObject.user)

    delete allKeys[7]
    delete allKeys[9]



    for (var id of allKeys) {
      if (id !== null && typeof id !== 'undefined') {
        console.log("id: ", id)
        var input = document.querySelector(`#${id[0]}`)
        
        input.style.border = "solid 1px red"
      }
    }

    for (var key of userKeys) {
      if (key !== null && typeof key !== 'undefined') {
        console.log("KEY: ", key)
        var input = document.querySelector(`#${key[0]}`)
        
        input.style.border = "solid 1px red"
      }
    }


  }

  
  return (
      defaultInformations.isValid.status === false 
      ? <>
        <h4 className="m-3 mb-4">Endereço para entrega</h4>
          <hr style={{opacity: "0.1"}} /> 

          <div className="checkout-address-container">
            <div className="address-form-container">
              <label className="mt-3 fw-light" htmlFor="firstName">Primeiro Nome</label>
              <input className="form-control" id='firstName' defaultValue={defaultInformations.firstName} onChange={changes => inputChanges(changes.target, "firstName")} />

              <label className="mt-3 fw-light" htmlFor="email">Email</label>
              <input className="form-control" id='email' defaultValue={defaultInformations.user.email} onChange={changes => inputChanges(changes.target, "email")}/>
              
              <label className="mt-3 fw-light" htmlFor="country">País</label>
              <input className="form-control" id='country' defaultValue="Brasil" onChange={changes => inputChanges(changes.target, "country")}/>

              <label className="mt-3 fw-light" htmlFor="street">Endereço</label>
              <input className="form-control" id='street' defaultValue={`${defaultInformations.district}, ${defaultInformations.street}`} onChange={changes => inputChanges(changes.target, "address")}/>

              <label className="mt-3 fw-light" htmlFor="state">Estado</label>
              <input className="form-control" id='state' defaultValue={defaultInformations.state} onChange={changes => inputChanges(changes.target, "state")}/>
            </div>

            <div className="address-form-container">
              <label className="mt-3 fw-light" htmlFor="secondName">Segundo Nome</label>
              <input className="form-control" id="secondName" defaultValue={defaultInformations.secondName} onChange={changes => inputChanges(changes.target, "secondName")}/>

              <label className="mt-3 fw-light" htmlFor="phoneNumber">Número de telefone</label>
              <input className="form-control" id="phoneNumber" defaultValue={defaultInformations.user.phone} onChange={changes => inputChanges(changes.target, "phoneNumber")}/>

              <label className="mt-3 fw-light" htmlFor="city">Cidade</label>
              <input className="form-control" id="city" defaultValue={defaultInformations.city} onChange={changes => inputChanges(changes.target, "city")}/>

              <label className="mt-3 fw-light" htmlFor="cep">CEP</label>
              <input className="form-control" id="cep" defaultValue={defaultInformations.cep} onChange={changes => inputChanges(changes.target, "cep")}/>

              <label className="mt-3 fw-light" defaultValue={defaultInformations.house_number} htmlFor="house_number">Número da residencia</label>
              <input className="form-control" id="house_number" onChange={changes => inputChanges(changes.target, "house_number")}/>
            </div>
          </div>

          <hr style={{opacity: "0.1"}} className="mt-4 mb-4 ms-3 me-3"/> 

          <div className="d-flex">
            <input class="form-check-input me-2" type="checkbox" id="receiveEmails" defaultChecked />
            <label htmlFor="receiveEmails" className="text-secondary">Receber emails sobre atualizações do meu pedido</label>
          </div>

          <div className="d-flex">
            <Link style={{flex: 'auto'}} to={"/my-shopping-cart"} className="no-href-decoration w-auto">
              <button className="btn btn-secondary form-control mt-4 me-2 p-2 shadow">
                <i class="fas fa-angle-left me-3"></i>
                Voltar para carro de compras
              </button>
            </Link>

            <Link style={{flex: 'auto'}} onClick={finishStep} className="no-href-decoration">
              <button className="btn btn-primary form-control mt-4 ms-2 p-2 shadow">
                Prosseguir para envio
                <i class="fas fa-angle-right ms-3"></i>
              </button>
            </Link>
          </div>      
      
        </>
      : <Redirect to={"/checkout/shipping"} />

  )
}